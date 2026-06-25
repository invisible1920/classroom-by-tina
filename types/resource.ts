export type Grade = "Kindergarten" | "First Grade" | "Second Grade";

export type Subject = "ELA" | "Math" | "Science" | "Social Studies";

export type ResourceCategory =
  | "Lesson Plan"
  | "Center"
  | "Assessment"
  | "Worksheet"
  | "Homework";

export interface Resource {
  id: string;
  title: string;
  description: string;
  grade: Grade;
  subject: Subject;
  week: number;
  standard: string;
  category: ResourceCategory;
  thumbnail: string;
  pdf: string;
  featured: boolean;
}