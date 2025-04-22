"use client";

import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollFade } from "./scroll-fade";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { StorageKeys } from "@/lib/storageKeys";
import { cn } from "@/lib/utils";

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tagsString = searchParams.get("tags");
  const currentTags = tagsString ? tagsString.split(",") : [];

  const [includedTags, setIncludedTags] = useState<string[]>();
  const [newIncludedTag, setNewIncludedTag] = useState("");
  const [excludedTags, setExcludedTags] = useState<string[]>();
  const [newExcludedTag, setNewExcludedTag] = useState("");

  // Load tags from localStorage on mount
  useEffect(() => {
    const savedIncludedTags = localStorage.getItem(
      StorageKeys.FILTER_INCLUDE_TAGS,
    );
    const savedExcludedTags = localStorage.getItem(
      StorageKeys.FILTER_EXCLUDE_TAGS,
    );

    if (savedIncludedTags) {
      setIncludedTags(JSON.parse(savedIncludedTags));
    } else {
      setIncludedTags(defaultIncludeFilters.map((filter) => filter));
    }

    if (savedExcludedTags) {
      setExcludedTags(JSON.parse(savedExcludedTags));
    } else {
      setExcludedTags(defaultExcludeFilters.map((filter) => filter));
    }
  }, []);

  useEffect(() => {
    if (!includedTags) return;
    localStorage.setItem(
      StorageKeys.FILTER_INCLUDE_TAGS,
      JSON.stringify(includedTags),
    );
  }, [includedTags]);

  useEffect(() => {
    if (!excludedTags) return;
    localStorage.setItem(
      StorageKeys.FILTER_EXCLUDE_TAGS,
      JSON.stringify(excludedTags),
    );
  }, [excludedTags]);

  useEffect(() => {
    document.body.style.opacity = "";
    document.body.style.pointerEvents = "";
  }, [searchParams?.toString(), pathname]);

  function addTag(tagType: "include" | "exclude") {
    const tagName = tagType === "include" ? newIncludedTag : newExcludedTag;

    if (!tagName.trim()) return;

    if (tagType === "include") {
      setIncludedTags((prev) => [...(prev ?? []), tagName.trim()]);
      setNewIncludedTag("");
    } else {
      setExcludedTags((prev) => [...(prev ?? []), tagName.trim()]);
      setNewExcludedTag("");
    }
  }

  function toggleTag(index: number) {
    if (!includedTags) return;

    const newSearchParams = new URLSearchParams(searchParams);

    const newTags = currentTags.includes(includedTags[index])
      ? currentTags.filter((tag) => tag !== includedTags[index])
      : [...currentTags, includedTags[index]];

    if (newTags.length === 0) {
      newSearchParams.delete("tags");
    } else {
      newSearchParams.set("tags", newTags.join(","));
    }

    document.body.style.opacity = "0.5";
    document.body.style.pointerEvents = "none";

    router.push(`?${newSearchParams.toString()}`);
  }

  function clearTags() {
    document.body.style.opacity = "0.5";
    document.body.style.pointerEvents = "none";

    router.push("/");
  }

  function deleteTag(index: number, tagType: "include" | "exclude") {
    if (tagType === "include") {
      if (!includedTags) return;

      setIncludedTags((prev) => prev?.filter((_, i) => i !== index));
      if (currentTags.includes(includedTags[index])) {
        toggleTag(index);
      }
    } else {
      setExcludedTags((prev) => prev?.filter((_, i) => i !== index));
    }
  }

  return (
    <ScrollFade
      key={`filter-bar-${includedTags?.length}-${excludedTags?.length}`}
      scrollMoreAmount={200}
      className="flex w-full items-center gap-3 overflow-x-auto pb-4"
      fade={{
        className: "p-0",
        buttonClassName: "bg-transparent m-0 shadow-none",
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <span className="material-symbols-rounded">palette</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="min-w-1/2 gap-0 p-0">
          <DialogHeader className="border-border border-b p-6">
            <DialogTitle>Personalized Feed</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="pb-2 font-semibold">Your Tags</h3>
                <DialogDescription>
                  These tags will be used to build your custom feed. You can
                  also filter out the content on your feed using these tags.
                  <br />
                  Click ENTER after a keyword to save it as a tag. Tags can
                  include: topics, content types (e.g; shorts, playlists, etc.),
                  channels, collections, etc.
                </DialogDescription>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a new tag..."
                  value={newIncludedTag}
                  onChange={(e) => setNewIncludedTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag("include")}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {includedTags?.map((tag, index) => (
                  <FilterTag
                    key={`filter-item-${tag}-${index}`}
                    tag={tag}
                    useCheckmark
                    variant={(isActive) => (isActive ? "default" : "contrast")}
                    onClick={() => toggleTag(index)}
                    onDelete={() => deleteTag(index, "include")}
                  />
                ))}
              </div>
            </div>

            {/* Excluded content section */}
            <div className="space-y-4">
              <div>
                <h3 className="pb-2 font-semibold">Excluded Content</h3>
                <DialogDescription>
                  You can prevent certain content or creators from appearing in
                  your feed.
                </DialogDescription>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add content to exclude..."
                  value={newExcludedTag}
                  onChange={(e) => setNewExcludedTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag("exclude")}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {excludedTags?.map((tag, index) => (
                  <FilterTag
                    key={`excluded-tag-item-${tag}-${index}`}
                    tag={tag}
                    variant={(isActive) => (isActive ? "default" : "contrast")}
                    onDelete={() => deleteTag(index, "exclude")}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FilterTag
        tag="All"
        variant={() => (currentTags.length === 0 ? "contrast" : "secondary")}
        onClick={clearTags}
      />

      {includedTags?.map((tag, index) => (
        <FilterTag
          key={`filter-bar-item-${tag}-${index}`}
          tag={tag}
          variant={(isActive) => (isActive ? "contrast" : "secondary")}
          onClick={() => toggleTag(index)}
        />
      ))}
    </ScrollFade>
  );
}

function FilterTag({
  tag,
  useCheckmark = false,
  onClick,
  onDelete,
  variant,
  className,
}: {
  tag: string;
  useCheckmark?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  variant?: (
    isActive: boolean,
  ) => React.ComponentProps<typeof Button>["variant"];
  className?: (isActive: boolean) => string;
}) {
  const searchParams = useSearchParams();

  const tagsString = searchParams.get("tags");
  const currentTags = tagsString ? tagsString.split(",") : [];

  const isActive = currentTags.includes(tag);

  const buttonVariant = variant?.(isActive);

  return (
    <Button
      variant={buttonVariant}
      className={className?.(isActive)}
      onClick={onClick}
    >
      {useCheckmark && isActive && (
        <span className="material-symbols-rounded text-primary text-sm">
          check
        </span>
      )}
      {tag}
      {onDelete && (
        <span
          className={cn(
            "material-symbols-rounded text-sm",
            isActive && "text-primary",
          )}
          onClick={onDelete}
        >
          close
        </span>
      )}
    </Button>
  );
}

const defaultIncludeFilters = [
  "Subscriptions",
  "Posts",
  "Music",
  "Tech",
  "Design",
  "Live",
  "Playlists",
  "Cats",
  "Dogs",
  "Animals",
  "Electronics",
  "New Creators",
  "Art",
  "Tech News",
  "Lofi beats",
  "UI/UX",
] as const;

const defaultExcludeFilters = [
  "Skibidi",
  "brainrot",
  "rizz",
  "TikTok",
  "Fortnite",
] as const;
