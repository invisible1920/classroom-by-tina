import {
  archiveResourceInSupabase,
  createResourceInSupabase,
  getResourcesFromSupabase,
  updateResourceInSupabase,
  restoreResourceInSupabase,
} from "@/repositories/resources/resources.repository";
import type {
  AbilityGroup,
  CreateResourceInput,
  Grade,
  Resource,
  ResourceCategory,
  ResourceStatus,
  Subject,
  UpdateResourceInput,
} from "@/types/resource";

export type ResourceSortBy =
  | "title"
  | "grade"
  | "subject"
  | "week"
  | "updatedAt";

export type SortOrder = "asc" | "desc";

export type GetResourcesOptions = {
  search?: string;
  grade?: Grade | "All Grades";
  subject?: Subject | "All Subjects";
  category?: ResourceCategory | "All Categories";
  ability_group?: AbilityGroup | "All Ability Groups";
  status?: ResourceStatus | "all";
  featured?: boolean;
  sortBy?: ResourceSortBy;
  sortOrder?: SortOrder;
  page?: number;
  pageSize?: number;
};

export type PaginatedResources = {
  items: Resource[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function getResources(
  options: GetResourcesOptions = {}
): Promise<PaginatedResources> {
  const resources = await getResourcesFromSupabase();

  const {
    search = "",
    grade = "All Grades",
    subject = "All Subjects",
    category = "All Categories",
    ability_group = "All Ability Groups",
    status = "all",
    featured,
    sortBy = "updatedAt",
    sortOrder = "desc",
    page = 1,
    pageSize = 12,
  } = options;

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = resources.filter((resource) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [
        resource.title,
        resource.description,
        resource.grade,
        resource.subject,
        resource.standard,
        resource.category,
        resource.ability_group,
        resource.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesGrade = grade === "All Grades" || resource.grade === grade;

    const matchesSubject =
      subject === "All Subjects" || resource.subject === subject;

    const matchesCategory =
      category === "All Categories" || resource.category === category;

    const matchesAbilityGroup =
      ability_group === "All Ability Groups" ||
      resource.ability_group === ability_group;

    const matchesStatus = status === "all" || resource.status === status;

    const matchesFeatured =
      typeof featured === "boolean" ? resource.featured === featured : true;

    return (
      matchesSearch &&
      matchesGrade &&
      matchesSubject &&
      matchesCategory &&
      matchesAbilityGroup &&
      matchesStatus &&
      matchesFeatured
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const start = (safePage - 1) * safePageSize;

  return {
    items: sorted.slice(start, start + safePageSize),
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
  };
}

export async function getResource(id: string): Promise<Resource | null> {
  const resources = await getResourcesFromSupabase();

  return (
    resources.find((resource) => resource.id === id || resource.slug === id) ??
    null
  );
}

export async function createResource(
  input: CreateResourceInput
): Promise<Resource> {
  const baseSlug = input.slug ?? slugify(input.title);
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;

  return createResourceInSupabase({
    ...input,
    ability_group: input.ability_group ?? "All",
    slug,
  });
}

export async function updateResource(
  id: string,
  updates: UpdateResourceInput
): Promise<Resource | null> {
  return updateResourceInSupabase(id, {
    ...updates,
    ability_group: updates.ability_group ?? "All",
  });
}

export async function deleteResource(id: string): Promise<Resource | null> {
  return archiveResource(id);
}

export async function archiveResource(id: string): Promise<Resource | null> {
  return archiveResourceInSupabase(id);
}

export async function duplicateResource(id: string): Promise<Resource | null> {
  const existing = await getResource(id);

  if (!existing) {
    return null;
  }

  return createResource({
    title: `${existing.title} Copy`,
    description: existing.description,
    grade: existing.grade,
    subject: existing.subject,
    week: existing.week,
    standard: existing.standard,
    category: existing.category,
    ability_group: existing.ability_group ?? "All",
    thumbnail: existing.thumbnail,
    pdf: existing.pdf,
    featured: false,
    status: "draft",
  });
}

export async function restoreResource(
  id: string
): Promise<Resource | null> {
  return restoreResourceInSupabase(id);
}

export async function searchResources(
  search: string
): Promise<PaginatedResources> {
  return getResources({ search });
}

export async function filterResources(
  options: GetResourcesOptions
): Promise<PaginatedResources> {
  return getResources(options);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}