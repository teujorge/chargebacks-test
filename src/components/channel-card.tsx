import { Channel } from "@/types";
import { LazyImage } from "./lazy-image";
import { cn } from "@/lib/utils";

export function ChannelCard({
  channel,
  className,
}: {
  channel: Channel | undefined;
  className?: string;
}) {
  return (
    <div className={cn("flex w-14 flex-col items-center gap-1", className)}>
      <div className="relative">
        <LazyImage
          src={channel?.avatar}
          alt={channel?.name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full"
        />

        <div className="border-background bg-primary absolute right-0.5 bottom-0.5 h-3 w-3 rounded-full border-2" />
      </div>
      <p
        className={cn(
          "line-clamp-1 text-center text-xs",
          !channel && "text-loading",
        )}
      >
        {channel?.name ?? "Channel Loading..."}
      </p>
    </div>
  );
}

export function ChannelCardSkeletons({
  count = 20,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const randomKey = Math.random().toString(36).substring(2, 15);

  return Array.from({ length: count }).map((_, index) => (
    <ChannelCard
      key={`channel-card-skeleton-${randomKey}-${index}`}
      channel={undefined}
      className={className}
    />
  ));
}
