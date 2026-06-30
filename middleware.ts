import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const DEVICE_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "cbt_device_id"
    : "cbt_device_id_dev";

function setDeviceCookie(response: NextResponse, deviceId: string) {
  response.cookies.set(DEVICE_COOKIE_NAME, deviceId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
}

export async function middleware(request: NextRequest) {
  const deviceId =
    request.cookies.get(DEVICE_COOKIE_NAME)?.value ?? crypto.randomUUID();

  request.cookies.set(DEVICE_COOKIE_NAME, deviceId);

  let response = NextResponse.next({
    request,
  });

  setDeviceCookie(response, deviceId);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });

          setDeviceCookie(response, deviceId);
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (!isAdminRoute && !isDashboardRoute) {
    return response;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, subscription_status")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute && profile.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    isDashboardRoute &&
    profile.role === "teacher" &&
    profile.subscription_status !== "pro"
  ) {
    return NextResponse.redirect(new URL("/subscribe", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};