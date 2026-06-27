export type Grade = "Kindergarten" | "First Grade" | "Second Grade";

export type Subject = "ELA" | "Math" | "Science" | "Social Studies";

export type ResourceCategory =
  | "Lesson Plan"
  | "Centers"
  | "Assessment"
  | "Homework"
  | "Parent Letter"
  | "Slides"
  | "Activity";

export type ResourceStatus = "draft" | "published" | "archived";

export type AbilityGroup = "All" | "Low" | "Medium" | "High";

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  grade: Grade;
  subject: Subject;
  month: string;
  week: number;
  standard: string;
  category: ResourceCategory;
  ability_group: AbilityGroup;
  thumbnail: string;
  pdf: string;
  featured: boolean;
  status: ResourceStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateResourceInput = {
  slug?: string;
  title: string;
  description: string;
  grade: Grade;
  subject: Subject;
  month: string;
  week: number;
  standard: string;
  category: ResourceCategory;
  ability_group: AbilityGroup;
  thumbnail: string;
  pdf: string;
  featured: boolean;
  status: ResourceStatus;
};

export type UpdateResourceInput = Partial<CreateResourceInput>;
