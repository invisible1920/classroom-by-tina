import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { createClient } from "@/utils/supabase/server";

async function updateSupportStatus(formData: FormData) {
  "use server";

  const requestId = String(formData.get("requestId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!requestId || !status) {
    return;
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("support_requests")
    .update({ status })
    .eq("id", requestId);

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePath("/admin/support");
redirect("/admin/support");
}

async function sendReply(formData: FormData) {
  "use server";

  const ticketId = String(formData.get("ticketId") ?? "");
  const message = String(formData.get("message") ?? "").trim();

  if (!ticketId || !message) {
    return;
  }

  const supabase = await createClient();

  // 1. Save the reply
  const { error: messageError } = await supabase
    .from("support_messages")
    .insert({
      ticket_id: ticketId,
      sender: "admin",
      message,
      is_read: false,
    });

  if (messageError) {
    console.error(messageError.message);
    return;
  }

  // 2. Update ticket status
  const { error: ticketError } = await supabase
    .from("support_requests")
    .update({
      status: "reviewing",
    })
    .eq("id", ticketId);

  if (ticketError) {
    console.error(ticketError.message);
    return;
  }

  revalidatePath("/admin/support");
  revalidatePath("/dashboard/support");
  redirect("/admin/support");
}

export default async function AdminSupportPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const { data: requests, error } = await supabase
  .from("support_requests")
  .select(`
    id,
    type,
    subject,
    message,
    status,
    created_at,
    user_id,
    support_messages (
  id,
  sender,
  message,
  created_at,
  is_read
)
  `)
  .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <Card className="p-6">
            <p className="font-bold text-red-600">{error.message}</p>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Support"
          title="Support Requests"
          description="View teacher questions, resource requests, and problem reports."
        />

        <section className="mt-8 space-y-4">
          {!requests?.length ? (
            <Card className="p-6">
              <p className="font-bold text-slate-500">
                No support requests yet.
              </p>
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-[#35c6c9]">
                      {formatRequestType(request.type)}
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-[#17223b]">
                      {request.subject}
                    </h2>

                    <p className="mt-2 text-sm font-bold text-slate-400">
                      Submitted {new Date(request.created_at).toLocaleString()}
                    </p>
                  </div>

                  <StatusBadge status={request.status} />
                </div>

                <div className="mt-5 space-y-4">
  <div className="rounded-2xl bg-slate-50 p-5">
    <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#35c6c9]">
      Teacher
    </p>

    <p className="whitespace-pre-wrap font-semibold leading-7 text-slate-700">
      {request.message}
    </p>
  </div>

  {request.support_messages?.map((reply: any) => (
    <div
      key={reply.id}
      className={`rounded-2xl p-5 ${
        reply.sender === "admin"
          ? "bg-[#1f2a44] text-white"
          : "bg-slate-100"
      }`}
    >
      <p className="mb-2 text-xs font-black uppercase tracking-wide opacity-80">
        {reply.sender === "admin" ? "Tina" : "Teacher"}
      </p>

      <p className="whitespace-pre-wrap font-semibold leading-7">
        {reply.message}
      </p>
    </div>
  ))}
</div>

                <form
                  action={updateSupportStatus}
                  className="mt-5 flex flex-wrap items-center gap-3"
                >
                  <input type="hidden" name="requestId" value={request.id} />

                  <select
                    name="status"
                    defaultValue={request.status ?? "open"}
                    className="admin-input max-w-xs"
                  >
                    <option value="open">Open</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    type="submit"
                    className="rounded-full bg-[#1f2a44] px-6 py-3 font-black text-white transition hover:bg-[#35c6c9]"
                  >
                    Save Status
                  </button>
                </form>
                <form action={sendReply} className="mt-6">
  <input type="hidden" name="ticketId" value={request.id} />

  <textarea
    name="message"
    required
    placeholder="Write a reply..."
    className="admin-input min-h-32 resize-none"
  />

  <button
    type="submit"
    className="mt-4 rounded-full bg-[#35c6c9] px-6 py-3 font-black text-white transition hover:bg-[#1f2a44]"
  >
    Send Reply
  </button>
</form>
              </Card>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string | null }) {
  const label = status ?? "open";

  const styles =
    label === "closed"
      ? "bg-slate-200 text-slate-600"
      : label === "reviewing"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700";

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-black capitalize ${styles}`}
    >
      {label}
    </span>
  );
}

function formatRequestType(type: string | null) {
  if (type === "resource_request") return "Request a Resource";
  if (type === "problem_report") return "Report a Problem";
  return "Contact Tina";
}