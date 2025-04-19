import { Video } from "@/app/api/videos/data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { uploadDateToString, viewsToString } from "@/lib/toString";
import Link from "next/link";

export function VideoCard({
  video,
  className,
}: {
  video: Video | undefined;
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
        "hover:border-primary/50 active:bg-primary/5 h-full flex-1 cursor-pointer overflow-hidden rounded-[17px] border border-transparent shadow-none transition-all duration-300 hover:shadow-lg",
        className,
        !video && "pointer-events-none",
      )}
    >
      <div className="relative">
        {video ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            className="aspect-video rounded-2xl border object-cover"
            width={800}
            height={450}
          />
        ) : (
          <div className="aspect-video animate-pulse rounded-lg bg-gray-200 object-cover" />
        )}
        {video && (
          <div className="absolute right-2 bottom-2 flex items-center justify-center rounded-[6px] bg-black/60 px-2 py-0.5 text-white backdrop-blur-md">
            <p>{video.duration}</p>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-2 p-4">
        {video ? (
          <Image
            src={video.authorAvatar}
            alt={video.author}
            className="h-10 w-10 rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <div className="h-10 min-h-10 w-10 min-w-10 animate-pulse rounded-full bg-gray-200" />
        )}
        <div>
          <h3
            className={cn(
              "mb-2 line-clamp-2 text-lg font-semibold",
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
  className,
}: {
  count?: number;
  className?: string;
}) {
  const randomKey = Math.random().toString(36).substring(2, 15);
  return Array.from({ length: count }).map((_, index) => (
    <VideoCard
      key={`video-card-skeleton-${randomKey}-${index}`}
      video={undefined}
      className={className}
    />
  ));
}
