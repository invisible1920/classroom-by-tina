import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, subscription_status")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) {
      return NextResponse.redirect(new URL("/signup", requestUrl.origin));
    }

    if (profile.role === "admin") {
      return NextResponse.redirect(new URL("/admin", requestUrl.origin));
    }

    if (profile.subscription_status === "pro") {
      return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
    }

    return NextResponse.redirect(new URL("/subscribe", requestUrl.origin));
  }

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}