import "server-only";

import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_ACTIVE_DEVICES = 1;
const ACTIVE_WINDOW_DAYS = 5;
const DEVICE_COOKIE_NAME =
  process.env.NODE_ENV === "production"
    ? "cbt_device_id"
    : "cbt_device_id_dev";

export async function enforceDeviceLimit() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { allowed: true };
  }

  const cookieStore = await cookies();
  const headerStore = await headers();

  const deviceId = cookieStore.get(DEVICE_COOKIE_NAME)?.value;

  if (!deviceId) {
    return {
      allowed: false,
      reason: "MISSING_DEVICE_ID",
    };
  }

  const userAgent = headerStore.get("user-agent") ?? "Unknown";

  const ipAddress =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "Unknown";

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - ACTIVE_WINDOW_DAYS);

  const { data: existingDevice } = await supabaseAdmin
  .from("user_devices")
  .select("id, revoked_at")
  .eq("user_id", user.id)
  .eq("device_id", deviceId)
  .maybeSingle();

if (existingDevice?.revoked_at) {
  await supabase.auth.signOut();

  const cookieStore = await cookies();

  cookieStore.delete("cbt_device_id");

  return {
    allowed: false,
    reason: "DEVICE_REVOKED",
  };
}

  if (existingDevice) {
    await supabaseAdmin
      .from("user_devices")
      .update({
        last_seen_at: new Date().toISOString(),
        user_agent: userAgent,
        ip_address: ipAddress,
      })
      .eq("id", existingDevice.id);

    return { allowed: true };
  }

  const { count } = await supabaseAdmin
    .from("user_devices")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("last_seen_at", cutoffDate.toISOString())
.is("revoked_at", null);

  if ((count ?? 0) >= MAX_ACTIVE_DEVICES) {
    return {
      allowed: false,
      reason: "DEVICE_LIMIT_REACHED",
    };
  }

  await supabaseAdmin.from("user_devices").insert({
    user_id: user.id,
    device_id: deviceId,
    user_agent: userAgent,
    ip_address: ipAddress,
  });

  return { allowed: true };
}