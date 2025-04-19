import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SheetClose, SheetTrigger } from "../ui/sheet";

interface LogoMenuProps {
  type: "button" | "sheetTrigger" | "sheetClose";
  onMenuClick?: () => void;
  className?: string;
  menuClassName?: string;
}

export function LogoMenu({
  type,
  onMenuClick,
  className,
  menuClassName,
}: LogoMenuProps) {
  const MenuButton =
    type === "button"
      ? Button
      : type === "sheetTrigger"
        ? SheetTrigger
        : SheetClose;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <MenuButton
        className={cn(
          "hover:bg-secondary cursor-pointer bg-transparent px-2 py-2",
          menuClassName,
        )}
        onClick={onMenuClick}
      >
        <Menu className="text-foreground h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </MenuButton>

      <Link href="/" className="flex items-center overflow-hidden rounded">
        <Image
          src="/chargebacks911_icon.png"
          alt="Icon"
          height={28}
          width={28}
          priority
        />
      </Link>
    </div>
  );
}
