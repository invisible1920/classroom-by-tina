import { supabaseAdmin } from "@/lib/supabase-admin";
import type {
  CreateResourceInput,
  Resource,
  UpdateResourceInput,
} from "@/types/resource";

type SupabaseResource = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  grade: Resource["grade"];
  subject: Resource["subject"];
  week: number;
  standard: string | null;
  category: Resource["category"];
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
    week: resource.week,
    standard: resource.standard ?? "",
    category: resource.category,
    featured: resource.featured,
    status: resource.status,
    thumbnail: resource.thumbnail ?? "",
    pdf: resource.pdf ?? "",
    createdAt: resource.created_at,
    updatedAt: resource.updated_at,
  };
}

export async function getResourcesFromSupabase(): Promise<Resource[]> {
  const { data, error } = await supabaseAdmin
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

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
      week: input.week,
      standard: input.standard,
      category: input.category,
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

  const { error } = await supabaseAdmin.from("resources").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return existing;
}