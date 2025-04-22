"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { TopBarSearch } from "./top-bar-search";

export function BottomTab() {
  return (
    <div className="bg-background sticky bottom-0 flex w-full flex-row items-center justify-between gap-2 p-4 md:hidden">
      {bottomTabItems.map((item, index) =>
        "href" in item ? (
          <TabButtonLink
            key={`bottom-tab-${item.title}-${index}`}
            item={item}
          />
        ) : (
          <TabButtonDialog
            key={`bottom-tab-${item.title}-${index}`}
            item={item}
          />
        ),
      )}
    </div>
  );
}

type BottomTabDialogItem = { title: string; icon: string };
type BottomTabLinkItem = BottomTabDialogItem & { href: string };

function TabButtonDialog({ item }: { item: BottomTabDialogItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <BottomTabItem item={item} isActive={isOpen} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <TopBarSearch onEnterCallback={() => setIsOpen(false)} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

function TabButtonLink({ item }: { item: BottomTabLinkItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link href={item.href}>
      <BottomTabItem item={item} isActive={isActive} />
    </Link>
  );
}

function BottomTabItem({
  item,
  isActive,
}: {
  item: BottomTabDialogItem | BottomTabLinkItem;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "material-symbols-rounded flex w-full items-center justify-center rounded-full px-4 py-2 transition-colors",
          isActive && "bg-primary/14",
        )}
      >
        <span
          className={cn(
            "material-symbols-rounded rounded-full transition-all",
            isActive ? "[--font-FILL:1]" : "text-muted-foreground",
          )}
          style={
            isActive
              ? {
                  background: "linear-gradient(to right, #FF0033, #F50057)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }
              : undefined
          }
        >
          {item.icon}
        </span>
      </div>
      <span
        className={cn(
          "text-xs transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {item.title}
      </span>
    </div>
  );
}

const bottomTabItems: (BottomTabDialogItem | BottomTabLinkItem)[] = [
  {
    title: "Home",
    href: "/",
    icon: "home",
  },
  {
    title: "Shorts",
    href: "/shorts",
    icon: "movie",
  },
  {
    title: "Search",
    icon: "search",
  },
  {
    title: "Subs",
    href: "/subscriptions",
    icon: "subscriptions",
  },
  {
    title: "Library",
    href: "/playlists",
    icon: "video_library",
  },
];
