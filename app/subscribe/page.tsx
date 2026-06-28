import Link from "next/link";
import { createCheckoutSession } from "@/app/actions/stripe";

export default function SubscribePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f0] px-6">
      <section className="w-full max-w-xl rounded-[2rem] bg-white p-10 text-center shadow-xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
          Classroom by Tina
        </p>

        <h1 className="mt-4 text-4xl font-black text-[#1f2a44]">
          Upgrade to Pro
        </h1>

        <p className="mt-4 text-lg font-semibold text-slate-500">
          Unlock the teacher dashboard, resources, downloads, and classroom tools.
        </p>

        <div className="mt-8 rounded-3xl bg-slate-50 p-6 text-left">
          <h2 className="text-2xl font-black text-[#1f2a44]">Pro Teacher</h2>

          <p className="mt-2 text-4xl font-black text-[#1f2a44]">
            $14.99<span className="text-base text-slate-500">/month</span>
          </p>

          <ul className="mt-5 space-y-3 font-semibold text-slate-600">
            <li>✓ Full monthly resource access</li>
            <li>✓ Next month available 4 days early</li>
            <li>✓ Lesson plans, centers, and downloads</li>
            <li>✓ Favorites</li>
            <li>✓ AI classroom tools soon</li>
          </ul>
        </div>

        <form action={createCheckoutSession}>
          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white"
          >
            Start Pro
          </button>
        </form>

        <p className="mt-5 text-sm font-semibold text-slate-500">
          Secure checkout powered by Stripe.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block text-sm font-bold text-blue-600"
        >
          Sign in with another account
        </Link>
      </section>
    </main>
  );
}