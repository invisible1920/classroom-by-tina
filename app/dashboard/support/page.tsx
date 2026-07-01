import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { HelpCircle, Mail, MessageSquarePlus, Bug } from "lucide-react";

import { createClient } from "@/utils/supabase/server";

import {
  submitSupportRequest,
  replyToTicket,
  closeTicket,
} from "./actions";

export default async function SupportPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: requests } = await supabase
  .from("support_requests")
  .select(`
    id,
    type,
    subject,
    message,
    status,
    created_at,
    support_messages (
      id,
      sender,
      message,
      created_at,
      is_read
    )
  `)
  .eq("user_id", user.id)
  .order("created_at", { ascending: false });

// Sort each conversation oldest -> newest
requests?.forEach((request: any) => {
  request.support_messages?.sort(
    (a: any, b: any) =>
      new Date(a.created_at).getTime() -
      new Date(b.created_at).getTime()
  );
});

return (
    <main>
      <section className="rounded-[2rem] bg-white p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e8fbfb] px-4 py-2 text-sm font-black text-[#35c6c9]">
          <HelpCircle size={16} />
          Help & Support
        </div>

        <h1 className="mt-5 text-4xl font-black text-[#17223b]">
          How can we help?
        </h1>

        <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
          Contact Tina, request a resource, report a problem, or check quick answers.
        </p>
      </section>

      {params.success && (
        <div className="mt-6 rounded-2xl bg-green-50 p-4 font-bold text-green-700">
          Thanks! Your support request was sent.
        </div>
      )}

      {params.error && (
        <div className="mt-6 rounded-2xl bg-red-50 p-4 font-bold text-red-700">
          {params.error}
        </div>
      )}

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <form
          action={submitSupportRequest}
          className="rounded-[2rem] bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-black text-[#17223b]">
            Send a request
          </h2>

          <div className="mt-6 grid gap-5">
            <select name="type" required className="admin-input">
              <option value="contact">Contact Tina</option>
              <option value="resource_request">Request a Resource</option>
              <option value="problem_report">Report a Problem</option>
            </select>

            <input
              name="subject"
              required
              placeholder="Subject"
              className="admin-input"
            />

            <textarea
              name="message"
              required
              placeholder="Tell us what you need..."
              className="admin-input min-h-40 resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white transition hover:bg-[#35c6c9]"
          >
            Send Request
          </button>
        </form>

        <aside className="grid gap-4">
          <SupportCard
            icon={<Mail size={22} />}
            title="Contact Tina"
            text="Ask a question about your account, resources, or classroom use."
          />

          <SupportCard
            icon={<MessageSquarePlus size={22} />}
            title="Request a Resource"
            text="Need a specific lesson, center, assessment, or parent letter? Send the idea."
          />

          <SupportCard
            icon={<Bug size={22} />}
            title="Report a Problem"
            text="Something not loading or a download not working? Let us know."
          />

          <div className="rounded-[2rem] border border-[#ffe7b5] bg-[#fffaf3] p-6">
            <h2 className="text-xl font-black text-[#17223b]">FAQ</h2>

            <div className="mt-4 space-y-4 text-sm font-semibold leading-6 text-slate-600">
              <p>
                <strong>When do new resources unlock?</strong>
                <br />
                Next month&apos;s resources unlock 4 days before the new month starts.
              </p>

              <p>
                <strong>Can I browse before subscribing?</strong>
                <br />
                Yes. Free accounts can browse and preview resources before upgrading.
              </p>

              <p>
                <strong>What does Pro include?</strong>
                <br />
                Unlimited downloads, favorites, AI tools, and new monthly resources.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-[#17223b]">
          My Support Requests
        </h2>

        {!requests?.length ? (
          <p className="mt-4 font-semibold text-slate-500">
            You haven&apos;t submitted any support requests yet.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {requests.map((request) => (
              <div
  key={request.id}
  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
>
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
      <p className="text-sm font-black uppercase tracking-wide text-[#35c6c9]">
        {formatRequestType(request.type)}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-black text-[#17223b]">
          {request.subject}
        </h3>

      </div>
    </div>

    <StatusBadge status={request.status} />
  </div>

  <div className="mt-5 space-y-4">
  <div className="rounded-2xl border border-slate-200 bg-slate-100 p-5">
    <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">
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
          : "border border-slate-200 bg-slate-100 text-slate-700"
      }`}
    >
      <p className="mb-2 text-xs font-black uppercase tracking-wide opacity-80">
        {reply.sender === "admin" ? "Tina" : "Teacher"}
      </p>

      <p className="whitespace-pre-wrap font-semibold leading-7">
        {reply.message}
      </p>

      <p className="mt-3 text-xs opacity-70">
        {new Date(reply.created_at).toLocaleString()}
      </p>
    </div>
  ))}

 {request.status === "closed" ? (
  <div className="rounded-2xl bg-green-50 p-5">
    <p className="font-black text-green-700">
      ✓ This ticket has been closed.
    </p>

    <p className="mt-2 font-semibold text-green-600">
      Need more help? Create a new support request above.
    </p>
  </div>
) : request.support_messages?.some(
    (m: any) => m.sender === "admin"
  ) ? (
  <form action={replyToTicket} className="space-y-4">
    <input type="hidden" name="ticketId" value={request.id} />

    <textarea
      name="message"
      required
      placeholder="Reply to Tina..."
      className="admin-input min-h-28 resize-none"
    />

    <div className="flex gap-3">
      <button
        type="submit"
        className="rounded-full bg-[#35c6c9] px-6 py-3 font-black text-white hover:bg-[#1f2a44]"
      >
        Send Reply
      </button>

      <button
        type="submit"
        formAction={closeTicket}
        className="rounded-full border border-slate-300 bg-white px-6 py-3 font-black text-slate-700 hover:bg-slate-100"
      >
        Close Ticket
      </button>
    </div>
  </form>
) : null}
</div>

<p className="mt-5 text-sm font-bold text-slate-400">
  Submitted {new Date(request.created_at).toLocaleDateString()}
</p>

</div>

            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function SupportCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8fbfb] text-[#35c6c9]">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-black text-[#17223b]">{title}</h3>

      <p className="mt-2 font-semibold leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string | null }) {
  const label = status ?? "open";

  const styles =
  label === "closed"
    ? "bg-slate-200 text-slate-700"
    : label === "reviewing"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

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