import { Removable, RemovableTrigger } from "@/components/removable";
import { ScrollFade } from "@/components/scroll-fade";
import { Button, buttonVariants } from "@/components/ui/button";
import { VideoCard, VideoCardSkeletons } from "@/components/video-card";
import { getFakeShorts } from "@/data/fakeVideos";
import { sleep } from "@/lib/sleep";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

export function ShortsVideos() {
  return (
    <Removable>
      <section className="border-home-shorts/35 flex flex-col gap-4 overflow-hidden rounded-xl md:border">
        <div className="flex flex-row justify-between gap-4 pt-6 md:px-6">
          <h2 className="font-roboto-condensed flex items-center gap-2 text-2xl font-bold">
            <span className="material-symbols-rounded text-foreground">
              movie
            </span>
            Shorts
          </h2>

          <div className="flex flex-row gap-2">
            <RemovableTrigger
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "cursor-pointer items-center rounded-full",
              )}
            >
              <span className="material-symbols-rounded">close</span>
              <span className="hidden md:block">Not interested</span>
            </RemovableTrigger>

            <Button className="group text-foreground !bg-home-shorts/35 hover:!bg-home-shorts/25 rounded-full">
              <span className="material-symbols-rounded group-hover:[--font-FILL:1]">
                thumb_up
              </span>
              <span className="hidden md:block">Show me more</span>
            </Button>
          </div>
        </div>

        <ScrollFade className="grid grid-cols-2 gap-2 pb-4 sm:grid-cols-3 md:flex md:flex-row md:gap-4 md:overflow-x-auto md:px-6">
          <Suspense
            fallback={
              <VideoCardSkeletons
                isShort={true}
                className="h-fit max-w-full md:min-w-56"
              />
            }
          >
            <Videos />
          </Suspense>
        </ScrollFade>
      </section>
    </Removable>
  );
}

async function Videos() {
  await sleep(5000);
  const videos = getFakeShorts();
  return videos.map((video) => (
    <VideoCard
      key={video.id}
      video={video}
      isShort={true}
      className="h-fit max-w-full md:min-w-56"
    />
  ));
}
