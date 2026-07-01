"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function submitSupportRequest(formData: FormData) {
  const type = String(formData.get("type") ?? "");
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  if (!type || !subject || !message) {
    redirect("/dashboard/support?error=Please fill out all fields");
  }

  const { error } = await supabase.from("support_requests").insert({
    user_id: user.id,
    type,
    subject,
    message,
    status: "open",
  });

  if (error) {
    redirect(
      `/dashboard/support?error=${encodeURIComponent(error.message)}`
    );
  }

  revalidatePath("/dashboard/support");
  redirect("/dashboard/support?success=1");
}
export async function replyToTicket(formData: FormData) {
  const ticketId = String(formData.get("ticketId") ?? "");
  const message = String(formData.get("message") ?? "").trim();

  if (!ticketId || !message) {
    return;
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verify this ticket belongs to this teacher
  const { data: ticket } = await supabase
    .from("support_requests")
    .select("id")
    .eq("id", ticketId)
    .eq("user_id", user.id)
    .single();

  if (!ticket) {
    redirect("/dashboard/support");
  }

  const { error } = await supabase
    .from("support_messages")
    .insert({
      ticket_id: ticketId,
      sender: "teacher",
      message,
      is_read: true,
    });

  if (error) {
    console.error(error.message);
    return;
  }

  // Re-open the ticket
  await supabase
    .from("support_requests")
    .update({
      status: "open",
    })
    .eq("id", ticketId);

  revalidatePath("/dashboard/support");
  revalidatePath("/admin/support");

  redirect("/dashboard/support");
}

export async function closeTicket(formData: FormData) {
  const ticketId = String(formData.get("ticketId") ?? "");

  if (!ticketId) {
    return;
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verify the ticket belongs to this teacher
  const { data: ticket } = await supabase
    .from("support_requests")
    .select("id")
    .eq("id", ticketId)
    .eq("user_id", user.id)
    .single();

  if (!ticket) {
    redirect("/dashboard/support");
  }

  const { data, error } = await supabase
  .from("support_requests")
  .update({
    status: "closed",
  })
  .eq("id", ticketId)
  .eq("user_id", user.id)
  .select("*");

console.log("ticketId:", ticketId);
console.log("updated rows:", data);
console.log("error:", error);

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePath("/dashboard/support");
  revalidatePath("/admin/support");

  redirect("/dashboard/support");
}