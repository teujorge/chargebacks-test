import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Bell, Settings } from "lucide-react";
import { SideNav } from "./side-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type SidebarNavItem } from "./header";
import { LogoMenu } from "./logo-menu";
import { Suspense } from "react";
import { TopBarSearch } from "./top-bar-search";

interface TopBarProps {
  sidebarNavItems: SidebarNavItem[];
  toggleCollapsed: () => void;
}

export function TopBar({ sidebarNavItems, toggleCollapsed }: TopBarProps) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="flex h-14 items-center p-4">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <Sheet>
            <LogoMenu className="md:hidden" type="sheetTrigger" />

            <SheetContent side="left" className="w-fit gap-0">
              <SheetTitle className="flex h-14 items-center border-b p-4">
                <span className="sr-only">Menu</span>
                <LogoMenu type="sheetClose" />
              </SheetTitle>

              <SideNav
                className="overflow-y-auto px-2 pt-0"
                items={sidebarNavItems}
                isCollapsed={false}
              />
            </SheetContent>
          </Sheet>

          {/* Desktop Collapse Button */}
          <div className="hidden md:flex">
            <LogoMenu type="button" onMenuClick={toggleCollapsed} />
          </div>
        </div>

        {/* Search Bar - Desktop Only */}
        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <Suspense>
            <TopBarSearch />
          </Suspense>
        </div>

        {/* Utility Buttons & Profile */}
        <div className="flex items-center justify-end space-x-2 not-md:flex-1">
          {/* Mobile: 2 utility buttons */}
          <div className="flex items-center space-x-1 md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>

          {/* Desktop: 3 utility buttons */}
          <div className="hidden items-center space-x-1 md:flex">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>

          {/* Profile Button */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Avatar className="h-7 w-7">
              <AvatarImage src="" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
