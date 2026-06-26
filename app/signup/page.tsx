import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function signup(formData: FormData) {
  "use server";

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error("SIGNUP ERROR:", error);
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/subscribe");
}

async function signInWithGoogle() {
  "use server";

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    redirect(data.url);
  }

  redirect("/signup?error=Could not start Google sign in");
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f0] px-6">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-black text-[#1f2a44]">
          Create account
        </h1>

        <p className="mt-2 font-semibold text-slate-500">
          Join Classroom by Tina
        </p>

        {params.error && (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 font-bold text-red-700">
            {params.error}
          </div>
        )}

        <form action={signup}>
          <div className="mt-6 grid gap-4">
            <input
              name="fullName"
              required
              placeholder="Full name"
              className="admin-input"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="admin-input"
            />

            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Password"
              className="admin-input"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white"
          >
            Create account
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            or
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="w-full rounded-full border border-slate-200 bg-white px-6 py-4 font-black text-[#1f2a44] hover:bg-slate-50"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-5 text-center text-sm font-semibold text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#3b82f6]">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}