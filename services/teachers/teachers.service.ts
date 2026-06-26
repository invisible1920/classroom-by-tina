import { getTeachers as getTeachersRepository } from "@/repositories/teachers/teachers.repository";

export async function getTeachers() {
  return getTeachersRepository();
}