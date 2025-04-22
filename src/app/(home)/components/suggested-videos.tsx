import { Removable, RemovableTrigger } from "@/components/removable";
import { Button, buttonVariants } from "@/components/ui/button";
import { VideoCard, VideoCardSkeletons } from "@/components/video-card";
import { getFakeSuggestedVideos } from "@/data/fakeVideos";
import { sleep } from "@/lib/sleep";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

export function SuggestedVideos() {
  return (
    <Removable className="hidden md:block">
      <section className="flex flex-col gap-4 overflow-hidden rounded-xl border border-[rgba(176,130,255,0.37)]">
        <div className="flex flex-row justify-between gap-4 px-6 pt-6">
          <h2 className="font-roboto-condensed text-2xl font-bold">
            Suggestions based on recent watches
          </h2>

          <div className="flex flex-row gap-2">
            <RemovableTrigger
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "cursor-pointer items-center rounded-full",
              )}
            >
              <span className="material-symbols-rounded text-foreground">
                close
              </span>
              <span>Not interested</span>
            </RemovableTrigger>

            <Button className="group text-foreground !bg-home-suggestions/35 hover:!bg-home-suggestions/25 rounded-full">
              <span className="material-symbols-rounded text-foreground group-hover:[--font-FILL:1]">
                thumb_up
              </span>
              <span>Show me more</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-4">
          <Suspense
            fallback={<VideoCardSkeletons className="h-fit min-w-80" />}
          >
            <Videos />
          </Suspense>
        </div>
      </section>
    </Removable>
  );
}

async function Videos() {
  await sleep();
  const videos = getFakeSuggestedVideos();
  return videos.map((video) => <VideoCard key={video.id} video={video} />);
}
