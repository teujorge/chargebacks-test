import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarNavItem } from "./header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
  isCollapsed: boolean;
}

export function SideNav({
  className,
  items,
  isCollapsed,
  ...props
}: SideNavProps) {
  return (
    <nav
      className={cn(
        "flex flex-col gap-2",
        isCollapsed ? "items-center" : "items-start",
        className,
      )}
      {...props}
    >
      <Accordion type="single" collapsible>
        <div className="flex flex-col gap-2 p-2">
          {items.map((item) => (
            <NavItem key={item.href} item={item} isSmall={isCollapsed} />
          ))}
        </div>
      </Accordion>
    </nav>
  );
}

function NavItem({
  item,
  isSmall,
}: {
  item: SidebarNavItem;
  isSmall: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  const NavItem = (
    <AccordionItem value={item.href} style={{ border: 0 }}>
      <div className="flex w-full items-center justify-between">
        <Button
          key={`side-nav-item-${item.href}`}
          asChild
          variant={isActive ? "default" : "ghost"}
          className={cn(
            "flex-1 justify-start",
            isActive && "pointer-events-none",
          )}
        >
          <Link href={item.href}>
            {item.icon && (
              <span
                className={cn(
                  "text-foreground mr-2",
                  isSmall ? "mr-0" : "mr-2",
                )}
              >
                {item.icon}
              </span>
            )}
            {!isSmall && <span className="text-foreground">{item.title}</span>}
          </Link>
        </Button>

        {item.subItems && (
          <>
            <div className="bg-secondary h-6 w-0.5 rounded-full" />

            <AccordionTrigger className="hover:bg-accent/50 flex cursor-pointer items-center justify-center p-2.5" />
          </>
        )}
      </div>

      <AccordionContent className="flex max-w-48 flex-col overflow-hidden pt-2 pl-6">
        {item.subItems?.map((subItem) => (
          <Link
            className="hover:bg-accent/50 flex flex-1 flex-row items-center gap-2 rounded-md p-2"
            key={subItem.href}
            href={subItem.href}
          >
            <Image
              src={subItem.img}
              alt={subItem.title}
              width={16}
              height={16}
              className="h-4 w-4 rounded-full"
            />
            <span className="line-clamp-1 text-sm">{subItem.title}</span>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );

  if (isSmall) {
    if (item.subItems) {
      return null;
    }

    return (
      <Tooltip key={`side-nav-tooltip-${item.href}`} delayDuration={0}>
        <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center">
          {item.title}
        </TooltipContent>
      </Tooltip>
    );
  }

  if (item.divider) {
    return (
      <>
        {NavItem}
        <div
          key={`side-nav-divider-${item.href}`}
          className="bg-muted h-0.5 w-full rounded-full"
        />
      </>
    );
  }

  return NavItem;
}
