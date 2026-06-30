import { supabaseAdmin } from "@/lib/supabase-admin";
import type {
  AbilityGroup,
  CreateResourceInput,
  Resource,
  UpdateResourceInput,
} from "@/types/resource";

const RESOURCE_BUCKET = "resources";

type SupabaseResource = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  grade: Resource["grade"];
  subject: Resource["subject"];
  month: string;
  week: number;
  standard: string | null;
  category: Resource["category"];
  ability_group: AbilityGroup | null;
  featured: boolean;
  status: Resource["status"];
  thumbnail: string | null;
  pdf: string | null;
  created_at: string;
  updated_at: string;
};

function mapResource(resource: SupabaseResource): Resource {
  return {
    id: resource.id,
    slug: resource.slug,
    title: resource.title,
    description: resource.description ?? "",
    grade: resource.grade,
    subject: resource.subject,
    month: resource.month,
    week: resource.week,
    standard: resource.standard ?? "",
    category: resource.category,
    ability_group: resource.ability_group ?? "All",
    featured: resource.featured,
    status: resource.status,
    thumbnail: resource.thumbnail ?? "",
    pdf: resource.pdf ?? "",
    createdAt: resource.created_at,
    updatedAt: resource.updated_at,
  };
}

export async function getResourcesFromSupabase(options?: {
  activeMonths?: string[];
  isAdmin?: boolean;
}): Promise<Resource[]> {
  let query = supabaseAdmin
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (!options?.isAdmin && options?.activeMonths?.length) {
    query = query.in("month", options.activeMonths);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapResource);
}

export async function getResourceFromSupabase(
  id: string
): Promise<Resource | null> {
  const { data, error } = await supabaseAdmin
    .from("resources")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapResource(data) : null;
}

export async function createResourceInSupabase(
  input: CreateResourceInput
): Promise<Resource> {
  const { data, error } = await supabaseAdmin
    .from("resources")
    .insert({
      slug: input.slug,
      title: input.title,
      description: input.description,
      grade: input.grade,
      subject: input.subject,
      month: input.month,
      week: input.week,
      standard: input.standard,
      category: input.category,
      ability_group: input.ability_group ?? "All",
      featured: input.featured,
      status: input.status,
      thumbnail: input.thumbnail,
      pdf: input.pdf,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapResource(data);
}

export async function updateResourceInSupabase(
  id: string,
  updates: UpdateResourceInput
): Promise<Resource | null> {
  const { data, error } = await supabaseAdmin
    .from("resources")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapResource(data) : null;
}

export async function archiveResourceInSupabase(
  id: string
): Promise<Resource | null> {
  return updateResourceInSupabase(id, {
    status: "archived",
    featured: false,
  });
}

export async function restoreResourceInSupabase(
  id: string
): Promise<Resource | null> {
  return updateResourceInSupabase(id, {
    status: "draft",
  });
}

export async function permanentlyDeleteResourceInSupabase(
  id: string
): Promise<Resource | null> {
  const existing = await getResourceFromSupabase(id);

  if (!existing) {
    return null;
  }

  const filesToDelete = await getUnusedStoragePaths(existing);

  const { error } = await supabaseAdmin.from("resources").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (filesToDelete.length > 0) {
    const { error: storageError } = await supabaseAdmin.storage
      .from(RESOURCE_BUCKET)
      .remove(filesToDelete);

    if (storageError) {
      throw new Error(storageError.message);
    }
  }

  return existing;
}

async function getUnusedStoragePaths(resource: Resource): Promise<string[]> {
  const values = [resource.pdf, resource.thumbnail].filter(Boolean);
  const uniqueValues = Array.from(new Set(values));
  const paths: string[] = [];

  for (const value of uniqueValues) {
    const [{ count: pdfCount, error: pdfError }, { count: thumbnailCount, error: thumbnailError }] =
      await Promise.all([
        supabaseAdmin
          .from("resources")
          .select("id", { count: "exact", head: true })
          .neq("id", resource.id)
          .eq("pdf", value),

        supabaseAdmin
          .from("resources")
          .select("id", { count: "exact", head: true })
          .neq("id", resource.id)
          .eq("thumbnail", value),
      ]);

    if (pdfError) {
      throw new Error(pdfError.message);
    }

    if (thumbnailError) {
      throw new Error(thumbnailError.message);
    }

    const stillUsed = (pdfCount ?? 0) + (thumbnailCount ?? 0) > 0;

    if (!stillUsed) {
      const path = getStoragePath(value);

      if (path) {
        paths.push(path);
      }
    }
  }

  return Array.from(new Set(paths));
}

function getStoragePath(value: string): string | null {
  if (!value) {
    return null;
  }

  if (!value.startsWith("http")) {
    return value.replace(/^resources\//, "");
  }

  try {
    const url = new URL(value);

    const publicMarker = `/storage/v1/object/public/${RESOURCE_BUCKET}/`;
    const signedMarker = `/storage/v1/object/sign/${RESOURCE_BUCKET}/`;

    if (url.pathname.includes(publicMarker)) {
      return decodeURIComponent(url.pathname.split(publicMarker)[1] ?? "");
    }

    if (url.pathname.includes(signedMarker)) {
      return decodeURIComponent(url.pathname.split(signedMarker)[1] ?? "");
    }

    return null;
  } catch {
    return null;
  }
}