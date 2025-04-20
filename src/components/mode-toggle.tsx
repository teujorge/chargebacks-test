"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span
        className={cn(
          "material-symbols-rounded scale-0 group-hover:[--font-FILL:1] dark:scale-100",
        )}
      >
        light_mode
      </span>
      <span
        className={cn(
          "material-symbols-rounded absolute scale-100 group-hover:[--font-FILL:1] dark:scale-0",
        )}
      >
        dark_mode
      </span>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
