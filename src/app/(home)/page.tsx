import { FilterBar } from "@/components/filter-bar";
import { FollowedChannels } from "./components/followed-channels";
import { ShortsVideos } from "./components/shorts-videos";
import { SuggestedVideos } from "./components/suggested-videos";
import { MissedVideos } from "./components/missed-videos";
import { TrendingVideos } from "./components/trending-videos";
import { MixedVideos } from "./components/mixed-videos";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="space-y-2">
      <FollowedChannels />
      <FilterBar />

      <div className="space-y-6 md:space-y-8">
        <MissedVideos />

        <div className="hidden md:block">
          <TrendingVideos />
        </div>

        <SuggestedVideos />

        <div className="hidden md:block">
          <ShortsVideos />
        </div>

        <div className="block md:hidden">
          <MixedVideos />
        </div>
      </div>
    </div>
  );
}
