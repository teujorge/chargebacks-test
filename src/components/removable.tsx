"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
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

  return (
    <div className={cn("relative", isClosed && "hidden", className)}>
      {children}

      <Button
        variant="ghost"
        className="hover:border-primary/14 absolute top-5 right-5 z-20 h-fit w-fit cursor-pointer rounded-full border border-transparent !p-2"
        onClick={handleClose}
      >
        <XIcon className="min-h-6 min-w-6" />
      </Button>
    </div>
  );
}
