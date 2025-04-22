import { VideoCard, VideoCardSkeletons } from "@/components/video-card";
import { Suspense } from "react";
import {
  getFakeMissedVideos,
  getFakeShorts,
  getFakeSuggestedVideos,
  getFakeTrendingVideos,
} from "@/data/fakeVideos";
import { ScrollFade } from "@/components/scroll-fade";
import { Removable, RemovableTrigger } from "@/components/removable";
import { sleep } from "@/lib/sleep";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterBar } from "@/components/filter-bar";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <FilterBar />

      <div className="space-y-6 pt-2">
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
                <MissedVideos />
              </Suspense>
            </ScrollFade>
          </section>
        </Removable>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Suspense fallback={<VideoCardSkeletons />}>
            <TrendingVideos />
          </Suspense>
        </section>

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
                <SuggestedVideos />
              </Suspense>
            </div>
          </section>
        </Removable>

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
                <ShortsVideos />
              </Suspense>
            </ScrollFade>
          </section>
        </Removable>
      </div>
    </>
  );
}

async function MissedVideos() {
  await sleep();
  const videos = getFakeMissedVideos();
  return videos.map((video) => (
    <VideoCard key={video.id} video={video} className="h-fit min-w-80" />
  ));
}

async function TrendingVideos() {
  await sleep();
  const videos = getFakeTrendingVideos();
  return videos.map((video) => <VideoCard key={video.id} video={video} />);
}

async function SuggestedVideos() {
  await sleep();
  const videos = getFakeSuggestedVideos();
  return videos.map((video) => <VideoCard key={video.id} video={video} />);
}

async function ShortsVideos() {
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
