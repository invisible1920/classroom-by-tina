export type TeacherRole = "admin" | "teacher";
export type TeacherSubscription = "free" | "pro";

export type Teacher = {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url?: string | null;
  role: TeacherRole;
  subscription_status: TeacherSubscription;
  created_at: string;
  updated_at?: string | null;
  last_login?: string | null;
};