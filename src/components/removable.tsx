"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";

export function Removable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isClosed, setIsClosed] = useState(false);

  function handleClose() {
    setIsClosed(true);
  }

  if (isClosed) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      {children}

      <Button
        variant="ghost"
        className="hover:border-primary/14 absolute top-5 right-5 z-20 h-fit w-fit cursor-pointer rounded-full border border-transparent !p-2"
        onClick={handleClose}
      >
        <span className="material-symbols-rounded">close</span>
      </Button>
    </div>
  );
}
