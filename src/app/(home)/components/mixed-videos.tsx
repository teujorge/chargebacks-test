import { VideoCard, VideoCardSkeletons } from "@/components/video-card";
import { getFakeTrendingVideos, getFakeShorts } from "@/data/fakeVideos";
import { sleep } from "@/lib/sleep";
import { JSX, Suspense } from "react";

export function MixedVideos() {
  return (
    <section className="grid grid-cols-1 gap-4">
      <Suspense fallback={<VideoCardSkeletons />}>
        <MixedVideosList />
      </Suspense>
    </section>
  );
}

async function MixedVideosList() {
  await sleep();
  const trendingVideos = getFakeTrendingVideos();
  const shortsVideos = getFakeShorts();

  let currentShortIndex = 0;
  const mixedVideos: JSX.Element[] = [];
  trendingVideos.map((video) => {
    mixedVideos.push(
      <VideoCard key={`mixed-trending-${video.id}`} video={video} />,
    );

    if (currentShortIndex < shortsVideos.length) {
      const short1 = shortsVideos[currentShortIndex];
      const short2 = shortsVideos[currentShortIndex + 1];

      mixedVideos.push(
        <div
          key={`mixed-shorts-${short1.id}-${short2.id}`}
          className="flex flex-1 flex-row gap-2"
        >
          <VideoCard video={short1} isShort={true} />
          <VideoCard video={short2} isShort={true} />
        </div>,
      );

      currentShortIndex += 2;
    }
  });

  return mixedVideos;
}
