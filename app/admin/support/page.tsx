import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { createClient } from "@/utils/supabase/server";

type SupportStatus = "open" | "reviewing" | "closed";

type SupportMessage = {
  id: string;
  sender: "teacher" | "admin";
  message: string;
  created_at: string;
  is_read: boolean;
};

type SupportRequest = {
  id: string;
  type: string | null;
  subject: string;
  message: string;
  status: SupportStatus | null;
  created_at: string;
  user_id: string;
  support_messages: SupportMessage[] | null;
};

async function updateSupportStatus(formData: FormData) {
  "use server";

  const requestId = String(formData.get("requestId") ?? "");
  const status = String(formData.get("status") ?? "") as SupportStatus;

  if (!requestId || !["open", "reviewing", "closed"].includes(status)) return;

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

  if (!ticketId || !message) return;

  const supabase = await createClient();

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

  const { error: ticketError } = await supabase
    .from("support_requests")
    .update({ status: "reviewing" })
    .eq("id", ticketId);

  if (ticketError) {
    console.error(ticketError.message);
    return;
  }

  revalidatePath("/admin/support");
  revalidatePath("/dashboard/support");
  redirect("/admin/support");
}

export default async function AdminSupportPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    q?: string;
  }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status ?? "all";
  const search = params.q?.trim() ?? "";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/dashboard");

  let query = supabase
    .from("support_requests")
    .select(
      `
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
    `
    )
    .order("created_at", { ascending: false });

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  if (search) {
    query = query.or(`subject.ilike.%${search}%,message.ilike.%${search}%`);
  }

  const { data, error } = await query;

  const requests = (data ?? []) as SupportRequest[];

  requests.forEach((request) => {
    request.support_messages?.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  });

  if (error) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <Card className="p-5">
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

        <SupportFilters statusFilter={statusFilter} search={search} />

        <section className="mt-8 space-y-4">
          {!requests.length ? (
            <Card className="p-5">
              <p className="font-bold text-slate-500">
                No support requests found.
              </p>
            </Card>
          ) : (
            requests.map((request) => (
              <SupportTicketCard key={request.id} request={request} />
            ))
          )}
        </section>
      </div>
    </main>
  );
}

function SupportFilters({
  statusFilter,
  search,
}: {
  statusFilter: string;
  search: string;
}) {
  return (
    <Card className="mt-8 p-5">
      <form className="grid gap-4 md:grid-cols-[1fr_220px_auto]" action="/admin/support">
        <input
          name="q"
          defaultValue={search}
          placeholder="Search tickets..."
          className="admin-input"
        />

        <select name="status" defaultValue={statusFilter} className="admin-input">
          <option value="all">All Tickets</option>
          <option value="open">Open</option>
          <option value="reviewing">Reviewing</option>
          <option value="closed">Closed</option>
        </select>

        <button
          type="submit"
          className="rounded-full bg-[#1f2a44] px-6 py-3 font-black text-white transition hover:bg-[#35c6c9]"
        >
          Filter
        </button>
      </form>
    </Card>
  );
}

function SupportTicketCard({ request }: { request: SupportRequest }) {
  return (
    <Card className="p-5">
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

      <Conversation request={request} />

      <div className="mt-5 space-y-4">
  <StatusForm request={request} />
  <ReplyForm request={request} />
</div>
    </Card>
  );
}

function Conversation({ request }: { request: SupportRequest }) {
  return (
    <div className="mt-4 max-h-[300px] space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3">
      <MessageBubble sender="teacher" message={request.message} />

      {request.support_messages?.map((reply) => (
        <MessageBubble
          key={reply.id}
          sender={reply.sender}
          message={reply.message}
        />
      ))}
    </div>
  );
}

function MessageBubble({
  sender,
  message,
}: {
  sender: "teacher" | "admin";
  message: string;
}) {
  const isAdmin = sender === "admin";

  return (
    <div
      className={`rounded-2xl p-5 ${
        isAdmin ? "bg-[#1f2a44] text-white" : "bg-slate-50 text-slate-700"
      }`}
    >
      <p
        className={`mb-2 text-xs font-black uppercase tracking-wide ${
          isAdmin ? "text-white/80" : "text-[#35c6c9]"
        }`}
      >
        {isAdmin ? "Tina" : "Teacher"}
      </p>

      <p className="whitespace-pre-wrap font-semibold leading-7">{message}</p>
    </div>
  );
}

function StatusForm({ request }: { request: SupportRequest }) {
  return (
    <form action={updateSupportStatus} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="requestId" value={request.id} />

      <select
        name="status"
        defaultValue={request.status ?? "open"}
        className="admin-input h-12 max-w-[220px]"
      >
        <option value="open">Open</option>
        <option value="reviewing">Reviewing</option>
        <option value="closed">Closed</option>
      </select>

      <button
        type="submit"
        className="h-12 rounded-full bg-[#1f2a44] px-6 font-black text-white transition hover:bg-[#35c6c9]"
      >
        Save Status
      </button>
    </form>
  );
}

function ReplyForm({ request }: { request: SupportRequest }) {
  return (
    <form action={sendReply} className="space-y-3">
      <input type="hidden" name="ticketId" value={request.id} />

      <textarea
        name="message"
        required
        placeholder="Write a reply..."
        className="admin-input min-h-28 resize-none"
      />

      <button
        type="submit"
        className="rounded-full bg-[#35c6c9] px-6 py-3 font-black text-white transition hover:bg-[#1f2a44]"
      >
        Send Reply
      </button>
    </form>
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
    <span className={`rounded-full px-4 py-2 text-sm font-black capitalize ${styles}`}>
      {label}
    </span>
  );
}

function formatRequestType(type: string | null) {
  if (type === "resource_request") return "Request a Resource";
  if (type === "problem_report") return "Report a Problem";
  return "Contact Tina";
}