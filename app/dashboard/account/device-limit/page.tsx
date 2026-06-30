import Link from "next/link";

export default function DeviceLimitPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] px-6 py-16">
      <section className="mx-auto max-w-xl rounded-3xl border border-[#ffe7b5] bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex rounded-full bg-[#fff4d8] px-4 py-2 text-sm font-black text-[#17223b]">
          Account protection
        </div>

        <h1 className="text-3xl font-black tracking-tight text-[#17223b]">
          This account is already active on one device.
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Classroom by Tina accounts are for individual teacher use. To continue,
          please sign out on another device first.
        </p>

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex rounded-full bg-[#35c6c9] px-6 py-3 font-black text-white shadow-sm transition hover:opacity-90"
          >
            Try again
          </Link>
        </div>
      </section>
    </main>
  );
}