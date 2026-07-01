import Link from "next/link";
import { createCheckoutSession } from "@/app/actions/stripe";

function getSubscribeMessage(reason?: string) {
  if (reason === "download") {
    return {
      heading: "Subscribe to download this resource.",
      body:
        "You can browse every grade level and preview every resource for free. Upgrade to Pro to download classroom materials, access AI teaching tools, save favorites, and unlock new monthly resources.",
    };
  }

  if (reason === "ai") {
    return {
      heading: "Subscribe to use AI teaching tools.",
      body:
        "AI tools are included with Pro. Upgrade to create lesson plans, classroom activities, and parent letters faster.",
    };
  }

  if (reason === "favorites") {
    return {
      heading: "Subscribe to save favorites.",
      body:
        "Favorites are included with Pro so you can save the resources you love and find them quickly later.",
    };
  }

  return null;
}

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message = getSubscribeMessage(reason);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f0] px-6">
      <section className="w-full max-w-xl rounded-[2rem] bg-white p-10 text-center shadow-xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
          Classroom by Tina
        </p>

        <h1 className="mt-4 text-4xl font-black text-[#1f2a44]">
          Upgrade to Pro
        </h1>

        {message ? (
          <div className="mt-6 rounded-3xl border border-[#ffe7b5] bg-[#fff8e8] p-6 text-left">
            <p className="text-sm font-black uppercase tracking-widest text-[#ff8a3d]">
              🔒 Pro Membership Required
            </p>

            <h2 className="mt-3 text-2xl font-black text-[#1f2a44]">
              {message.heading}
            </h2>

            <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
              {message.body}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-lg font-semibold text-slate-500">
            Unlock unlimited classroom resources, downloads, AI tools, and new
            monthly teaching materials.
          </p>
        )}

        <div className="mt-8 rounded-3xl bg-slate-50 p-6 text-left">
          <h2 className="text-2xl font-black text-[#1f2a44]">Pro Teacher</h2>

          <p className="mt-2 text-4xl font-black text-[#1f2a44]">
            $14.99
            <span className="text-base font-semibold text-slate-500">
              /month
            </span>
          </p>

          <ul className="mt-6 space-y-3 font-semibold text-slate-600">
            <li>✓ Unlimited monthly resource downloads</li>
            <li>✓ CMS-aligned K–2 lesson plans</li>
            <li>✓ Centers, assessments, and classroom activities</li>
            <li>✓ AI Lesson Planner</li>
            <li>✓ AI Activity Generator</li>
            <li>✓ AI Parent Letter Creator</li>
            <li>✓ Save favorites</li>
            <li>✓ New teaching resources added every month</li>
          </ul>
        </div>

        <form action={createCheckoutSession}>
          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white transition hover:bg-[#35c6c9]"
          >
            Unlock Pro for $14.99/month
          </button>
        </form>

        <p className="mt-5 text-sm font-semibold text-slate-500">
          Secure checkout powered by Stripe. Cancel anytime.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm font-bold text-blue-600 hover:underline"
        >
          Continue Browsing →
        </Link>
      </section>
    </main>
  );
}