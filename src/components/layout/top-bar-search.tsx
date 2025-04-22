import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  error: string;
}

export function TopBarSearch({
  onEnterCallback,
}: {
  onEnterCallback?: (query: string) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch(searchInputRef.current?.value ?? "");
      if (onEnterCallback) onEnterCallback(searchInputRef.current?.value ?? "");
    }
  }

  const handleSearch = (newQuery: string) => {
    console.log("handleSearch", newQuery);
    const params = new URLSearchParams(searchParams);
    if (newQuery) params.set("search", newQuery);
    else params.delete("search");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative flex h-10 w-full max-w-2xl items-center">
      <div
        className="absolute top-0 left-0 flex h-full w-14 items-center justify-center"
        onClick={() => searchInputRef.current?.focus()}
      >
        <span className="material-symbols-rounded text-muted-foreground">
          search
        </span>
      </div>

      <Input
        ref={searchInputRef}
        defaultValue={search}
        placeholder="Filter categories..."
        className="!bg-background/75 h-10 rounded-full pr-16 pl-12 !text-lg"
        style={{
          paddingLeft: "48px",
          paddingRight: "64px",
        }}
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
          className="group hover:!bg-primary/14 absolute top-2 right-1 h-auto w-auto cursor-pointer rounded-full py-1"
          onClick={listen}
        >
          <span className="material-symbols-rounded group-hover:text-foreground text-muted-foreground group-hover:[--font-FILL:1]">
            mic
          </span>
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
              <span
                className={cn(
                  "material-symbols-rounded",
                  isListening && "text-primary animate-ping",
                )}
              >
                mic
              </span>
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
