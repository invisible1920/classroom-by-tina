import { redirect } from "next/navigation";
import { Download } from "lucide-react";

import ResourceCard from "@/components/resources/ResourceCard";
import { createClient } from "@/utils/supabase/server";
import { getResources } from "@/services";
import { getFavoriteResourceIds } from "@/lib/favorites";

export default async function DownloadsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: downloads, error } = await supabase
    .from("resource_downloads")
    .select("resource_id, downloaded_at")
    .eq("user_id", user.id)
    .order("downloaded_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const favoriteResourceIds = new Set(await getFavoriteResourceIds(user.id));

  const downloadedIds = [
    ...new Set((downloads ?? []).map((download) => download.resource_id)),
  ];

  const resources = await getResources({
    status: "published",
    pageSize: 1000,
  });

  const downloadedResources = downloadedIds
    .map((id) => resources.items.find((resource) => resource.id === id))
    .filter((resource): resource is NonNullable<typeof resource> =>
      Boolean(resource)
    );

  return (
    <main>
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-blue-100 p-4">
          <Download className="text-blue-600" size={28} />
        </div>

        <div>
          <h1 className="text-4xl font-black text-slate-900">My Downloads</h1>

          <p className="mt-2 text-lg text-slate-600">
            Every resource you&apos;ve downloaded is saved here for quick access.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
        <p className="font-semibold text-slate-600">
          {downloadedResources.length} downloaded resource
          {downloadedResources.length !== 1 && "s"}
        </p>
      </div>

      {downloadedResources.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Download className="mx-auto mb-4 text-slate-300" size={48} />

          <h2 className="text-2xl font-bold text-slate-900">
            No downloads yet
          </h2>

          <p className="mt-3 text-slate-600">
            Download any classroom resource and it will automatically appear
            here.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {downloadedResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={favoriteResourceIds.has(resource.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}