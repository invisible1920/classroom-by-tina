export type TeacherRole = "admin" | "teacher";
export type TeacherSubscription = "free" | "pro";

export type Teacher = {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  role: TeacherRole;
  subscription: TeacherSubscription;
  created_at: string;
  last_login: string | null;
};