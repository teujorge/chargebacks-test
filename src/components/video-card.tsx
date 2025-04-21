import type { Video } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { uploadDateToString, viewsToString } from "@/lib/toString";
import Link from "next/link";

export function VideoCard({
  video,
  isShort = false,
  className,
}: {
  video: Video | undefined;
  isShort?: boolean;
  className?: string;
}) {
  const viewsString = video ? viewsToString(video.views) : "";
  const timeAgoString = video
    ? uploadDateToString(new Date(video.uploadDate))
    : "";

  return (
    <div
      key={`${Math.random()}-${video?.id}`}
      className={cn(
        "active:bg-primary/5 relative h-full flex-1 cursor-pointer overflow-hidden transition-all duration-300",
        className,
        !video && "pointer-events-none",
      )}
    >
      <div className="relative">
        {video ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            className={cn(
              "rounded-2xl border object-cover",
              isShort ? "aspect-[9/16]" : "aspect-video",
            )}
            width={800}
            height={450}
          />
        ) : (
          <div
            className={cn(
              "bg-muted-foreground animate-pulse rounded-lg object-cover",
              isShort ? "aspect-[9/16]" : "aspect-video",
            )}
          />
        )}
        {video && !isShort && (
          <div className="absolute right-2 bottom-2 flex items-center justify-center rounded-[6px] bg-black/60 px-2 py-0.5 text-white backdrop-blur-md">
            <p>{video.duration}</p>
          </div>
        )}
      </div>
      <div className={cn("flex flex-row gap-2", isShort ? "" : "py-4")}>
        {!isShort &&
          (video ? (
            <Image
              src={video.authorAvatar}
              alt={video.author}
              className="h-10 w-10 rounded-full"
              width={40}
              height={40}
            />
          ) : (
            <div className="h-10 min-h-10 w-10 min-w-10 animate-pulse rounded-full bg-gray-200" />
          ))}
        <div
          className={cn(
            "flex flex-col gap-1 sm:static",
            isShort &&
              "from-background absolute right-[1px] bottom-[1px] left-[1px] rounded-b-[15px] bg-gradient-to-t from-0% to-transparent to-95% p-4",
          )}
        >
          <h3
            className={cn(
              "line-clamp-1 text-lg font-semibold sm:line-clamp-2",
              !video && "text-loading",
            )}
          >
            {video?.title ??
              "Title Loading... Title Loading... Title Loading..."}
          </h3>
          <Link
            href={`/channel/${video?.author}`}
            className={cn(
              "text-muted-foreground hover:text-foreground text-sm",
              !video && "text-loading",
            )}
          >
            {video?.author ?? "Author Loading..."}
          </Link>
          <p
            className={cn(
              "text-muted-foreground text-sm",
              !video && "text-loading",
              isShort && "hidden sm:block",
            )}
          >
            {viewsString} • {timeAgoString}
          </p>
        </div>
      </div>
    </div>
  );
}

export function VideoCardSkeletons({
  count = 20,
  isShort = false,
  className,
}: {
  count?: number;
  isShort?: boolean;
  className?: string;
}) {
  const randomKey = Math.random().toString(36).substring(2, 15);
  return Array.from({ length: count }).map((_, index) => (
    <VideoCard
      key={`video-card-skeleton-${randomKey}-${index}`}
      video={undefined}
      className={className}
      isShort={isShort}
    />
  ));
}
