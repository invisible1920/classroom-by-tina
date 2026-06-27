import Link from "next/link";
import { Heart } from "lucide-react";
import { redirect } from "next/navigation";

import ResourceCard from "@/components/resources/ResourceCard";
import { getResource } from "@/services";
import { createClient } from "@/utils/supabase/server";

export default async function FavoritesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: favorites, error } = await supabase
    .from("resource_favorites")
    .select("resource_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const favoriteResources = await Promise.all(
    (favorites ?? []).map((favorite) => getResource(favorite.resource_id))
  );

  const resources = favoriteResources.filter((resource) => resource !== null);

  return (
    <main>
      <section className="rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/15">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-white/10 p-3 text-[#f5b942]">
            <Heart size={30} />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
              Teacher Library
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Favorites
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
              Quick access to the lesson plans, centers, activities, and
              classroom resources you saved for later.
            </p>
          </div>
        </div>
      </section>

      {resources.length > 0 ? (
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite
            />
          ))}
        </section>
      ) : (
        <section className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <Heart size={30} />
          </div>

          <h2 className="mt-6 text-3xl font-black text-[#1f2a44]">
            No favorites yet
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-slate-600">
            Tap the heart icon on any resource to save it here for quick access.
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-full bg-[#1f2a44] px-6 py-3 font-black text-white transition hover:-translate-y-0.5"
          >
            Browse Resources
          </Link>
        </section>
      )}
    </main>
  );
}