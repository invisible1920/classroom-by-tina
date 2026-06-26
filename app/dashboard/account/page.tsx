import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

async function updateProfile(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const school = String(formData.get("school") ?? "").trim();
  const gradeLevel = String(formData.get("gradeLevel") ?? "").trim();
  const subjects = formData.getAll("subjects").map(String);

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      school,
      grade_level: gradeLevel,
      subjects,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    redirect(
      `/dashboard/account?error=${encodeURIComponent(
        "Could not update profile"
      )}`
    );
  }

  revalidatePath("/dashboard/account");
  revalidatePath("/dashboard");

  redirect(
    `/dashboard/account?success=${encodeURIComponent("Profile updated")}`
  );
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, email, school, role, subscription_status, grade_level, subjects"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/signup");
  }

  const selectedSubjects = profile.subjects ?? [];

  return (
    <>
      <h1 className="text-4xl font-bold text-slate-900">
        Account Settings
      </h1>

      <p className="mt-3 text-lg text-slate-600">
        Manage your profile and subscription.
      </p>

      {params.success && (
        <div className="mt-6 rounded-2xl bg-green-50 p-4 font-bold text-green-700">
          {params.success}
        </div>
      )}

      {params.error && (
        <div className="mt-6 rounded-2xl bg-red-50 p-4 font-bold text-red-700">
          {params.error}
        </div>
      )}

      <form
        action={updateProfile}
        className="mt-10 rounded-3xl border bg-white p-8 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-slate-900">
          Profile
        </h2>

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2">
            <span className="font-bold text-slate-700">Full Name</span>
            <input
              name="fullName"
              defaultValue={profile.full_name ?? ""}
              className="admin-input"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-bold text-slate-700">School</span>
            <input
              name="school"
              defaultValue={profile.school ?? ""}
              className="admin-input"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-bold text-slate-700">Grade Level</span>
            <select
              name="gradeLevel"
              defaultValue={profile.grade_level ?? ""}
              className="admin-input"
            >
              <option value="">Select grade</option>
              <option value="Kindergarten">Kindergarten</option>
              <option value="First Grade">First Grade</option>
              <option value="Second Grade">Second Grade</option>
              <option value="Multiple Grades">Multiple Grades</option>
            </select>
          </label>

          <div>
            <p className="font-bold text-slate-700">Subjects</p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["Reading", "Writing", "Math", "Science", "Social Studies"].map(
                (subject) => (
                  <label
                    key={subject}
                    className="flex items-center gap-3 rounded-2xl border p-4 font-semibold text-slate-700"
                  >
                    <input
                      type="checkbox"
                      name="subjects"
                      value={subject}
                      defaultChecked={selectedSubjects.includes(subject)}
                    />
                    {subject}
                  </label>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-bold text-slate-500">Email</p>
            <p className="mt-1 font-semibold text-slate-900">
              {profile.email}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 rounded-full bg-[#1f2a44] px-8 py-4 font-black text-white"
        >
          Save Changes
        </button>
      </form>

      <section className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Subscription
        </h2>

        <p className="mt-4 text-lg font-semibold capitalize text-slate-700">
          Current plan: {profile.subscription_status}
        </p>
      </section>
    </>
  );
}