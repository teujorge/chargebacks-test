import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Bell, Settings, Mic } from "lucide-react";
import { SideNav } from "./side-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type SidebarNavItem } from "./header";
import { LogoMenu } from "./logo-menu";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";

interface TopBarProps {
  sidebarNavItems: SidebarNavItem[];
  toggleCollapsed: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  error: string;
}

export function TopBar({ sidebarNavItems, toggleCollapsed }: TopBarProps) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="flex h-14 items-center p-4">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <LogoMenu />
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <LogoMenu showMenu={false} className="mb-4" />
              <SideNav
                className="px-2"
                items={sidebarNavItems}
                isCollapsed={false}
              />
            </SheetContent>
          </Sheet>

          {/* Desktop Collapse Button */}
          <div className="hidden md:flex">
            <LogoMenu onMenuClick={toggleCollapsed} />
          </div>
        </div>

        {/* Search Bar - Desktop Only */}
        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <TopBarSearch />
        </div>

        {/* Utility Buttons & Profile */}
        <div className="flex items-center space-x-2">
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

function TopBarSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch(searchInputRef.current?.value ?? "");
  }

  const handleSearch = (newQuery: string) => {
    console.log("handleSearch", newQuery);
    const params = new URLSearchParams(searchParams);
    if (newQuery) params.set("search", newQuery);
    else params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex w-full max-w-xl items-center">
      <Search className="relative top-0 left-8 h-4 w-4" />
      <Input
        ref={searchInputRef}
        defaultValue={search}
        placeholder="Filter categories..."
        className="bg-background rounded-full px-10"
        onKeyDown={handleEnter}
      />
      <TopBarSearchMic onSearch={handleSearch} />
    </div>
  );
}

function TopBarSearchMic({ onSearch }: { onSearch: (query: string) => void }) {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query) {
        onSearch(query);
        setIsOpen(false);

        // timeout delay dialog to close
        setTimeout(() => {
          setIsListening(false);
          setText("");
        }, 500);
      }
    }, 1000),
    [onSearch],
  );

  useEffect(() => {
    if (text) debouncedSearch(text);
    return () => debouncedSearch.cancel();
  }, [text, debouncedSearch]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setText(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionEvent) => {
      // Don't show error for aborted recognition
      if (event.error !== "aborted") {
        setError(`Error occurred in recognition: ${event.error}`);
      }
      setIsListening(false);
    };

    if (isListening) recognition.start();
    else recognition.stop();

    return () => recognition.stop();
  }, [isListening]);

  function listen() {
    setIsOpen(true);
    setIsListening(true);
    setError(null);
  }

  function toggleListening() {
    setIsListening((prev) => !prev);
  }

  const emptyText = text === "";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:!bg-primary/14 relative top-0 right-11 h-auto w-auto cursor-pointer rounded-full py-1.5"
          onClick={listen}
        >
          <Mic className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="h-32 max-h-full">
          <DialogTitle
            className={cn(
              "text-3xl",
              isListening && emptyText && "text-muted-foreground",
            )}
          >
            {error
              ? error
              : isListening
                ? emptyText
                  ? "Listening..."
                  : text
                : "Microphone Off"}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <div className="mx-auto flex flex-col items-center gap-2">
            <Button
              className="!h-16 !w-16 cursor-pointer rounded-full border-4 !bg-transparent"
              onClick={toggleListening}
              variant="ghost"
            >
              <Mic
                className={cn(
                  "h-full w-full",
                  isListening && "text-primary animate-ping",
                )}
              />
            </Button>

            <span className="text-muted-foreground h-3 text-xs">
              {isListening ? " " : "Press to speak"}
            </span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
