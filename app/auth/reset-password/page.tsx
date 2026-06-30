import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function updatePassword(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password.length < 8) {
    redirect("/auth/reset-password?error=Password must be at least 8 characters");
  }

  if (password !== confirmPassword) {
    redirect("/auth/reset-password?error=Passwords do not match");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    redirect(`/auth/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/login?message=Password updated. Please sign in.");
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f0] px-6">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-black text-[#1f2a44]">
          Create new password
        </h1>

        <p className="mt-2 font-semibold text-slate-500">
          Choose a new password for your Classroom by Tina account.
        </p>

        {params.error && (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 font-bold text-red-700">
            {params.error}
          </div>
        )}

        <form action={updatePassword} className="mt-6">
          <div className="grid gap-4">
            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="New password"
              className="admin-input"
            />

            <input
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              placeholder="Confirm new password"
              className="admin-input"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white"
          >
            Update password
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