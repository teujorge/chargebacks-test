import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SheetClose, SheetTrigger } from "../ui/sheet";
import { useHeader } from "@/providers/HeaderProvider";
import { LazyImage } from "../lazy-image";

interface LogoMenuProps {
  type: "button" | "sheetTrigger" | "sheetClose";
  className?: string;
  menuClassName?: string;
}

export function LogoMenu({ type, className, menuClassName }: LogoMenuProps) {
  const { isSideNavCollapsed, toggleSideNavCollapsed } = useHeader();

  const MenuButton =
    type === "button"
      ? Button
      : type === "sheetTrigger"
        ? SheetTrigger
        : SheetClose;

  function getMenuIconClassName() {
    if (type === "sheetClose") {
      return "animate-to-close";
    }

    if (type === "sheetTrigger") {
      return "animate-to-open";
    }

    if (type === "button" && isSideNavCollapsed) {
      return "animate-to-expand";
    }

    return "animate-to-open";
  }

  return (
    <div className={cn("flex items-center gap-2 sm:gap-4", className)}>
      <MenuButton
        size="icon"
        variant="ghost"
        className={cn(
          "group hover:bg-secondary flex size-9 min-w-fit cursor-pointer items-center justify-center rounded-md bg-transparent shadow-none",
          menuClassName,
        )}
        onClick={type === "button" ? toggleSideNavCollapsed : undefined}
      >
        <MenuIcon className={cn(getMenuIconClassName())} />
        <span className="sr-only">Toggle menu</span>
      </MenuButton>

      <Link href="/" className="flex items-center overflow-hidden rounded">
        <LazyImage
          src="/yt_logo_rgb_light.png"
          alt="Icon"
          height={20}
          width={96}
          priority
          className="h-5 w-24 opacity-100 dark:opacity-0"
          wrapperClassName="bg-opacity-0"
        />
        <LazyImage
          src="/yt_logo_rgb_dark.png"
          alt="Icon"
          height={20}
          width={96}
          priority
          className="absolute h-5 w-24 opacity-0 dark:opacity-100"
          wrapperClassName="bg-opacity-0"
        />
      </Link>
    </div>
  );
}

function MenuIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 -960 960 960"
      {...props}
      className={cn(
        "[&>path]:fill-foreground size-6 [&>path]:transform [&>path]:transition-all [&>path]:duration-200",
        className,
      )}
    >
      <path
        d="M160-640q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z"
        className={cn(
          "[transform-origin:center_-680px]",
          "group-hover:[.animate-to-close_&]:translate-y-1/5 group-hover:[.animate-to-close_&]:rotate-45",
          "[.animate-to-expand_&]:-translate-y-1/2 [.animate-to-expand_&]:opacity-0",
        )}
      />

      <path
        d="M160-440q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Z"
        className={cn(
          "group-hover:[.animate-to-close_&]:opacity-0",
          "[.animate-to-expand_&]:-translate-y-1/5",
        )}
      />
      <path
        d="M160-440q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Z"
        className={cn(
          "group-hover:[.animate-to-close_&]:opacity-0",
          "[.animate-to-expand_&]:translate-y-1/5",
        )}
      />

      <path
        d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Z"
        className={cn(
          "[transform-origin:center_-280px]",
          "group-hover:[.animate-to-close_&]:-translate-y-1/5 group-hover:[.animate-to-close_&]:-rotate-45",
          "[.animate-to-expand_&]:translate-y-1/2 [.animate-to-expand_&]:opacity-0",
        )}
      />
    </svg>
  );
}
