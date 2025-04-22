import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SideNav } from "./side-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoMenu } from "./logo-menu";
import { Suspense } from "react";
import { TopBarSearch } from "./top-bar-search";

export function TopBar() {
  return (
    <header className="bg-background supports-[backdrop-filter]:bg-background/75 dark:supports-[backdrop-filter]:bg-background/95 sticky top-0 z-50 w-full backdrop-blur-lg">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <Sheet>
            <LogoMenu className="md:hidden" type="sheetTrigger" />

            <SheetContent
              side="left"
              withCloseButton={false}
              className="w-fit gap-0"
            >
              <SheetTitle className="flex h-14 items-center border-b p-4">
                <span className="sr-only">Menu</span>
                <LogoMenu type="sheetClose" />
              </SheetTitle>

              <SideNav
                forceExpandedItems={true}
                className="overflow-y-auto px-2 pt-0"
              />
            </SheetContent>
          </Sheet>

          {/* Desktop Collapse Button */}
          <div className="hidden md:flex">
            <LogoMenu type="button" />
          </div>
        </div>

        {/* Search Bar - Desktop Only */}
        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <Suspense>
            <TopBarSearch />
          </Suspense>
        </div>

        {/* Utility Buttons & Profile */}
        <div className="flex items-center justify-end gap-2 not-md:flex-1 lg:gap-4">
          {/* Mobile: 2 utility buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" className="group h-9 w-9">
              <span className="material-symbols-rounded group-hover:[--font-FILL:1]">
                notifications
              </span>
            </Button>

            <ModeToggle />
          </div>

          {/* Desktop: 3 utility buttons */}
          <div className="hidden items-center gap-2 md:flex lg:gap-4">
            <Button variant="ghost" size="icon" className="group h-9 w-9">
              <span className="material-symbols-rounded group-hover:[--font-FILL:1]">
                notifications
              </span>
            </Button>

            <Button variant="ghost" size="icon" className="group h-9 w-9">
              <span className="material-symbols-rounded group-hover:[--font-FILL:1]">
                settings
              </span>
            </Button>
            <ModeToggle />
          </div>

          {/* Profile Button */}
          <Button variant="ghost" size="icon" className="group h-9 w-9">
            <Avatar className="h-7 w-7 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg">
              <AvatarImage src="https://mjorge.me/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftennis-close.a3b46286.webp&w=2048&q=75" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
