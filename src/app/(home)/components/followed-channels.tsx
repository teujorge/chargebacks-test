import { ChannelCard, ChannelCardSkeletons } from "@/components/channel-card";
import { ScrollFade } from "@/components/scroll-fade";
import { getFakeFollowedChannels } from "@/data/fakeVideos";
import { sleep } from "@/lib/sleep";
import { Suspense } from "react";

export function FollowedChannels() {
  return (
    <div className="block md:hidden">
      <ScrollFade
        className="flex flex-row gap-4 overflow-x-auto pb-3"
        fade={{
          buttonClassName: "p-0 mb-4 bg-transparent",
        }}
      >
        <Suspense fallback={<ChannelCardSkeletons />}>
          <Channels />
        </Suspense>
      </ScrollFade>
    </div>
  );
}

async function Channels() {
  await sleep();
  const channels = getFakeFollowedChannels();
  return channels.map((channel) => (
    <ChannelCard key={channel.id} channel={channel} />
  ));
}
