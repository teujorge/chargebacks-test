import { RemovableTrigger } from "@/components/removable";
import { Removable } from "@/components/removable";
import { ScrollFade } from "@/components/scroll-fade";
import { buttonVariants } from "@/components/ui/button";
import { VideoCard, VideoCardSkeletons } from "@/components/video-card";
import { getFakeMissedVideos } from "@/data/fakeVideos";
import { sleep } from "@/lib/sleep";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

export function MissedVideos() {
  return (
    <Removable className="hidden md:block">
      <section className="bg-home-missed/5 flex flex-col gap-4 overflow-hidden rounded-xl">
        <div className="flex flex-row justify-between gap-4 px-6 pt-6">
          <h2 className="font-roboto-condensed text-2xl font-bold">
            In Case You Missed
          </h2>

          <RemovableTrigger
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "cursor-pointer rounded-full p-2",
            )}
          >
            <span className="material-symbols-rounded text-foreground">
              close
            </span>
          </RemovableTrigger>
        </div>

        <ScrollFade
          className="flex flex-row gap-4 overflow-x-auto px-6 pb-4"
          fade={{
            className: "dark:from-[#252222] from-[#e9e0e0]",
          }}
        >
          <Suspense
            fallback={<VideoCardSkeletons className="h-fit min-w-80" />}
          >
            <Videos />
          </Suspense>
        </ScrollFade>
      </section>
    </Removable>
  );
}

async function Videos() {
  await sleep();
  const videos = getFakeMissedVideos();
  return videos.map((video) => (
    <VideoCard key={video.id} video={video} className="h-fit min-w-80" />
  ));
}
