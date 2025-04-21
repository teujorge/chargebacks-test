"use client";

import { cn } from "@/lib/utils";
import { createContext, useContext, useState } from "react";
import React from "react";

interface RemovableContextType {
  isClosed: boolean;
  setIsClosed: (value: boolean) => void;
}

const RemovableContext = createContext<RemovableContextType | undefined>(
  undefined,
);

function useRemovable() {
  const context = useContext(RemovableContext);
  if (!context) {
    throw new Error("useRemovable must be used within a Removable");
  }
  return context;
}

interface RemovableProps {
  children: React.ReactNode;
  className?: string;
}

interface RemovableTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function Removable({ children, className }: RemovableProps) {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return null;
  }

  return (
    <RemovableContext.Provider value={{ isClosed, setIsClosed }}>
      <div className={cn("relative", className)}>{children}</div>
    </RemovableContext.Provider>
  );
}

function RemovableTrigger({ children, className }: RemovableTriggerProps) {
  const { setIsClosed } = useRemovable();

  return (
    <div className={className} onClick={() => setIsClosed(true)}>
      {children}
    </div>
  );
}

export { Removable, RemovableTrigger };
