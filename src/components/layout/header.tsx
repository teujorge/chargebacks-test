"use client";

import {
  Home,
  History,
  ThumbsUp,
  ListMusic,
  GalleryVerticalEnd,
  Library,
  Clock4,
  Compass,
  TvMinimalPlay,
  Clapperboard,
} from "lucide-react";
import { TopBar } from "./top-bar";
import { SideNav } from "./side-nav";
import { useMemo, useState } from "react";

interface HeaderProps {
  children: React.ReactNode;
}

export interface SidebarNavItem {
  href: string;
  title: string;
  icon: React.ReactNode;
  subItems?: SidebarSubNavItem[];
  divider?: boolean;
}

export interface SidebarSubNavItem {
  href: string;
  title: string;
  img: string;
}

const getSidebarNavItems = (): SidebarNavItem[] => [
  {
    title: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    title: "Explore",
    href: "/explore",
    icon: <Compass />,
  },
  {
    title: "Shorts",
    href: "/shorts",
    icon: <Clapperboard />,
  },
  {
    title: "TV Mode",
    href: "/tv",
    icon: <TvMinimalPlay />,
    divider: true,
  },
  {
    title: "History",
    href: "/history",
    icon: <History />,
  },
  {
    title: "Watch Later",
    href: "/watch-later",
    icon: <Clock4 />,
  },
  {
    title: "Liked Videos",
    href: "/liked-videos",
    icon: <ThumbsUp />,
  },
  {
    title: "Playlists",
    href: "/playlists",
    icon: <ListMusic />,
    subItems: [
      {
        title: "My Playlists",
        href: "/playlists/my-playlists",
        img: `https://picsum.photos/seed/${Math.random()}/50`,
      },
      {
        title: "Liked Playlists",
        href: "/playlists/liked-playlists",
        img: `https://picsum.photos/seed/${Math.random()}/50`,
      },
    ],
    divider: true,
  },
  {
    title: "Collections",
    href: "/collections",
    icon: <Library />,
    subItems: [
      {
        title: "My Collections",
        href: "/collections/my-collections",
        img: `https://picsum.photos/seed/${Math.random()}/50`,
      },
    ],
  },
  {
    title: "Subscriptions",
    href: "/subscriptions",
    icon: <GalleryVerticalEnd />,
    subItems: [
      {
        title: "Chargebacks911",
        href: "/subscriptions/chargebacks911",
        img: `https://picsum.photos/seed/${Math.random()}/50`,
      },
      {
        title: "f911",
        href: "/subscriptions/f911",
        img: `https://picsum.photos/seed/${Math.random()}/50`,
      },
    ],
  },
];

export function Header({ children }: HeaderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarNavItems = useMemo(() => getSidebarNavItems(), []);

  return (
    <div className="relative flex min-h-svh flex-col">
      <TopBar
        sidebarNavItems={sidebarNavItems}
        toggleCollapsed={() => setIsCollapsed((prev) => !prev)}
      />

      <div className="flex flex-1 flex-row">
        <aside className="fixed top-14 bottom-0 left-0 z-30 hidden h-[calc(100svh-3.5rem)] w-fit shrink-0 overflow-y-auto p-4 md:sticky md:block">
          <SideNav items={sidebarNavItems} isCollapsed={isCollapsed} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
