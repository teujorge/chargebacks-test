import { VideoCardSkeletons } from "@/components/video-card";
import { VideoCard } from "@/components/video-card";
import { getFakeTrendingVideos } from "@/data/fakeVideos";
import { sleep } from "@/lib/sleep";
import { Suspense } from "react";

export function TrendingVideos() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Suspense fallback={<VideoCardSkeletons />}>
        <Videos />
      </Suspense>
    </section>
  );
}

async function Videos() {
  await sleep();
  const videos = getFakeTrendingVideos();
  return videos.map((video) => <VideoCard key={video.id} video={video} />);
}
