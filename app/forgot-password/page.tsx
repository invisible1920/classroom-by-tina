import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function sendResetLink(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    redirect("/forgot-password?error=Email is required");
  }

  const supabase = await createClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://classroombytina.com";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/reset-password`,
  });

  if (error) {
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/forgot-password?success=1");
}

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f0] px-6">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-black text-[#1f2a44]">
          Reset password
        </h1>

        <p className="mt-2 font-semibold text-slate-500">
          Enter your email and we&apos;ll send you a secure reset link.
        </p>

        {params.error && (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 font-bold text-red-700">
            {params.error}
          </div>
        )}

        {params.success && (
          <div className="mt-5 rounded-2xl bg-green-50 p-4 font-bold text-green-700">
            Check your email for a password reset link.
          </div>
        )}

        <form action={sendResetLink} className="mt-6">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="admin-input"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white"
          >
            Send reset link
          </button>
        </form>

        <p className="mt-5 text-center text-sm font-semibold text-slate-500">
          Remember your password?{" "}
          <Link href="/login" className="text-[#3b82f6] hover:underline">
            Back to sign in
          </Link>
        </p>
      </section>
    </main>
  );
}