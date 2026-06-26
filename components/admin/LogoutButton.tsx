import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function logout() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/login");
}

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-full bg-[#1f2a44] px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
      >
        Logout
      </button>
    </form>
  );
}