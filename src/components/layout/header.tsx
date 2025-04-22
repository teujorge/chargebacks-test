"use client";

import { TopBar } from "./top-bar";
import { SideNav } from "./side-nav";
import { HeaderProvider } from "@/providers/HeaderProvider";

interface HeaderProps {
  children: React.ReactNode;
}

export interface SidebarNavItem {
  href: string;
  title: string;
  icon: string;
  subItems?: SidebarSubNavItem[];
  divider?: boolean;
}

export interface SidebarSubNavItem {
  href: string;
  title: string;
  img: string;
}

export const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: "home",
  },
  {
    title: "Explore",
    href: "/explore",
    icon: "explore",
  },
  {
    title: "Shorts",
    href: "/shorts",
    icon: "movie",
  },
  {
    title: "TV Mode",
    href: "/tv",
    icon: "tv_remote",
    divider: true,
  },
  {
    title: "History",
    href: "/history",
    icon: "overview",
  },
  {
    title: "Watch Later",
    href: "/watch-later",
    icon: "schedule",
  },
  {
    title: "Liked Videos",
    href: "/liked-videos",
    icon: "thumb_up",
  },
  {
    title: "Playlists",
    href: "/playlists",
    icon: "video_library",
    subItems: [
      {
        title: "My Playlists",
        href: "/playlists/my-playlists",
        img: "https://picsum.photos/seed/my-playlists/50",
      },
      {
        title: "Liked Playlists",
        href: "/playlists/liked-playlists",
        img: "https://picsum.photos/seed/liked-playlists/50",
      },
    ],
    divider: true,
  },
  {
    title: "Collections",
    href: "/collections",
    icon: "tile_small",
    subItems: [
      {
        title: "My Collections",
        href: "/collections/my-collections",
        img: "https://picsum.photos/seed/my-collections/50",
      },
    ],
  },
  {
    title: "Subscriptions",
    href: "/subscriptions",
    icon: "subscriptions",
    divider: true,
    subItems: [
      {
        title: "Chargebacks911",
        href: "/subscriptions/chargebacks911",
        img: "https://picsum.photos/seed/chargebacks911/50",
      },
      {
        title: "fi911",
        href: "/subscriptions/fi911",
        img: "https://picsum.photos/seed/fi911/50",
      },
    ],
  },
];

export function Header({ children }: HeaderProps) {
  return (
    <HeaderProvider>
      <div className="relative flex min-h-svh flex-col">
        <TopBar />

        <div className="flex flex-1 flex-row">
          <aside className="fixed top-14 bottom-0 left-0 z-30 hidden h-[calc(100svh-3.5rem)] w-fit shrink-0 overflow-y-auto p-4 md:sticky md:block">
            <SideNav />
          </aside>
          <main className="flex w-full flex-col overflow-hidden p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </HeaderProvider>
  );
}
