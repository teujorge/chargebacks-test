import { VideoCard, VideoCardSkeletons } from "@/components/video-card";
import { Suspense } from "react";
import { Video } from "../api/videos/data";
import { ScrollFade } from "@/components/scroll-fade";
import { Removable } from "@/components/removable";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Removable className="hidden md:block">
        <section className="flex flex-col gap-4 overflow-hidden rounded-xl bg-[rgba(196,228,255,0.08)]">
          <h2 className="px-6 pt-6 text-2xl font-bold">In Case You Missed</h2>
          <ScrollFade className="flex flex-row gap-4 overflow-x-auto px-6 pb-4">
            <Suspense
              fallback={<VideoCardSkeletons className="h-fit min-w-80" />}
            >
              <MissedVideos />
            </Suspense>
          </ScrollFade>
        </section>
      </Removable>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <Suspense fallback={<VideoCardSkeletons />}>
          <TrendingVideos />
        </Suspense>
      </section>
    </div>
  );
}

async function getMissedVideos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos/missed`);
  if (!res.ok) throw new Error("Failed to fetch missed videos");
  return (await res.json()) as Video[];
}

export async function MissedVideos() {
  const videos = await getMissedVideos();
  return videos.map((video) => (
    <VideoCard key={video.id} video={video} className="h-fit min-w-80" />
  ));
}

async function getTrendingVideos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos/trending`);
  if (!res.ok) throw new Error("Failed to fetch trending videos");
  return (await res.json()) as Video[];
}

export async function TrendingVideos() {
  const videos = await getTrendingVideos();
  return videos.map((video) => <VideoCard key={video.id} video={video} />);
}
