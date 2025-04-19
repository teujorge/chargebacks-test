import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SheetTrigger } from "../ui/sheet";

interface LogoMenuProps {
  showMenu?: boolean;
  onMenuClick?: () => void;
  className?: string;
  menuClassName?: string;
}

export function LogoMenu({
  showMenu = true,
  onMenuClick,
  className,
  menuClassName,
}: LogoMenuProps) {
  const MenuButton = showMenu ? Button : SheetTrigger;

  return (
    <div className={cn("flex items-center", className)}>
      {showMenu && (
        <MenuButton
          variant="ghost"
          className={cn(
            "mr-2 px-2 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
            menuClassName,
          )}
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </MenuButton>
      )}
      <Link href="/" className="flex items-center overflow-hidden rounded">
        <Image
          src="/chargebacks911_icon.png"
          alt="Icon"
          height={32}
          width={32}
          priority
        />
      </Link>
    </div>
  );
}
