import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function login(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    redirect("/login?error=Invalid login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, subscription_status")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/signup");
  }

  if (profile.role === "admin") {
    redirect("/admin");
  }

  redirect("/dashboard");
}

async function signInWithGoogle() {
  "use server";

  const supabase = await createClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://classroombytina.com";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    redirect(data.url);
  }

  redirect("/login?error=Could not start Google sign in");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reason?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f0] px-6">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-black text-[#1f2a44]">Sign in</h1>

        <p className="mt-2 font-semibold text-slate-500">
          Classroom by Tina
        </p>

        {params.error && (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 font-bold text-red-700">
            {params.error}
          </div>
        )}

        {params.reason === "device_revoked" && (
  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
    <h3 className="font-black text-amber-900">
      You've been signed out
    </h3>

    <p className="mt-1 text-sm font-semibold text-amber-800">
      This device was removed from your trusted devices. Please sign in again if
      you'd like to use this device.
    </p>
  </div>
)}

        <form action={login}>
  <div className="mt-6 grid gap-4">
    <input
      name="email"
      type="email"
      required
      placeholder="Email"
      className="admin-input"
    />

    <div>
      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        className="admin-input"
      />

      <div className="mt-2 text-right">
        <Link
          href="/forgot-password"
          className="text-sm font-bold text-[#3b82f6] hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  </div>

  <button
    type="submit"
    className="mt-6 w-full rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white"
  >
    Sign in
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
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#3b82f6]">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}