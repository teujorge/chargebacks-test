"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

interface FadeState {
  show: boolean;
  render: boolean;
}

export function ScrollFade({
  children,
  scrollMoreAmount = 400,
  className,
  fade,
}: {
  children: React.ReactNode;
  scrollMoreAmount?: number;
  className?: string;
  fade?: {
    className?: string;
    buttonClassName?: string;
  };
}) {
  const [showLeftFade, setShowLeftFade] = useState<FadeState>({
    show: false,
    render: false,
  });
  const [showRightFade, setShowRightFade] = useState<FadeState>({
    show: false,
    render: false,
  });
  const [showTopFade, setShowTopFade] = useState<FadeState>({
    show: false,
    render: false,
  });
  const [showBottomFade, setShowBottomFade] = useState<FadeState>({
    show: false,
    render: false,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // on init
    handleScroll();

    // watch for size changes of the scroll container
    const resizeObserver = new ResizeObserver(handleScroll);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  function handleScroll() {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollTop, scrollWidth, scrollHeight } =
      scrollContainerRef.current;
    const { clientWidth, clientHeight } = scrollContainerRef.current;

    setShowLeftFade({
      show: scrollLeft > 0,
      render: scrollWidth > clientWidth,
    });
    setShowRightFade({
      show: scrollLeft < scrollWidth - clientWidth,
      render: scrollWidth > clientWidth,
    });
    setShowTopFade({
      show: scrollTop > 0,
      render: scrollHeight > clientHeight,
    });
    setShowBottomFade({
      show: scrollTop < scrollHeight - clientHeight,
      render: scrollHeight > clientHeight,
    });
  }

  function scrollMore(position: "top" | "bottom" | "left" | "right") {
    if (!scrollMoreAmount) return undefined;

    function _scrollMore() {
      if (!scrollContainerRef.current) return;

      if (position === "top") {
        const currentScroll = scrollContainerRef.current.scrollTop;
        const newScroll = currentScroll - scrollMoreAmount;
        scrollContainerRef.current.scrollTo({
          top: newScroll,
          behavior: "smooth",
        });
      }

      if (position === "left") {
        const currentScroll = scrollContainerRef.current.scrollLeft;
        const newScroll = currentScroll - scrollMoreAmount;
        scrollContainerRef.current.scrollTo({
          left: newScroll,
          behavior: "smooth",
        });
      }

      if (position === "right") {
        const currentScroll = scrollContainerRef.current.scrollLeft;
        const newScroll = currentScroll + scrollMoreAmount;
        scrollContainerRef.current.scrollTo({
          left: newScroll,
          behavior: "smooth",
        });
      }

      if (position === "bottom") {
        const currentScroll = scrollContainerRef.current.scrollTop;
        const newScroll = currentScroll + scrollMoreAmount;
        scrollContainerRef.current.scrollTo({
          top: newScroll,
          behavior: "smooth",
        });
      }
    }

    return _scrollMore;
  }

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className={className}
        onScroll={handleScroll}
      >
        {children}

        {showLeftFade.render && (
          <Fade
            show={showLeftFade.show}
            position="left"
            onClickToScroll={scrollMore("left")}
            {...fade}
          />
        )}
        {showRightFade.render && (
          <Fade
            show={showRightFade.show}
            position="right"
            onClickToScroll={scrollMore("right")}
            {...fade}
          />
        )}
        {showTopFade.render && (
          <Fade
            show={showTopFade.show}
            position="top"
            onClickToScroll={scrollMore("top")}
            {...fade}
          />
        )}
        {showBottomFade.render && (
          <Fade
            show={showBottomFade.show}
            position="bottom"
            onClickToScroll={scrollMore("bottom")}
            {...fade}
          />
        )}
      </div>
    </div>
  );
}

function Fade({
  show,
  position,
  onClickToScroll,
  className,
  buttonClassName,
}: {
  show: boolean;
  position: "top" | "bottom" | "left" | "right";
  onClickToScroll?: () => void;
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <div
      className={cn(
        "from-background absolute flex min-h-full items-center justify-center from-5% to-transparent to-95% p-4 transition-opacity duration-200",
        show ? "opacity-100" : "pointer-events-none opacity-0",
        position === "top" &&
          "top-0 h-1/6 max-h-32 min-h-20 w-full items-start bg-gradient-to-b",
        position === "bottom" &&
          "bottom-0 h-1/6 max-h-32 min-h-20 w-full items-end bg-gradient-to-t",
        position === "left" &&
          "left-0 h-full w-1/6 max-w-32 min-w-20 justify-start bg-gradient-to-r",
        position === "right" &&
          "right-0 h-full w-1/6 max-w-32 min-w-20 justify-end bg-gradient-to-l",
        className,
      )}
      onClick={onClickToScroll}
    >
      {onClickToScroll && (
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "hover:border-primary/50 h-12 w-12 cursor-pointer rounded-full border-transparent",
            position === "left" && "rotate-0",
            position === "right" && "rotate-180",
            position === "top" && "-rotate-90",
            position === "bottom" && "rotate-90",
            buttonClassName,
          )}
          onClick={onClickToScroll}
        >
          <span className="material-symbols-rounded">chevron_left</span>
        </Button>
      )}
    </div>
  );
}
