import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useHeader } from "@/providers/HeaderProvider";
import { sidebarNavItems } from "./header";

export function SideNav(props: React.HTMLAttributes<HTMLElement>) {
  const { isSideNavCollapsed } = useHeader();

  return (
    <nav
      className={cn(
        "flex flex-col gap-2",
        isSideNavCollapsed ? "items-center" : "items-start",
        props.className,
      )}
      {...props}
    >
      <Accordion type="single" collapsible>
        <div className="flex flex-col gap-2 p-2">
          {sidebarNavItems.map((item) => (
            <NavItem key={item.href} item={item} isSmall={isSideNavCollapsed} />
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
  const someSubActive = item.subItems?.some((subItem) =>
    pathname.startsWith(subItem.href),
  );

  const NavItem = (
    <AccordionItem value={item.href} style={{ border: 0 }}>
      <div className="flex w-full items-center justify-between gap-1">
        <Button
          key={`side-nav-item-${item.href}`}
          asChild
          variant={isActive ? "default" : "ghost"}
          className={cn(
            "group flex-1 justify-start !px-3",
            isActive && "pointer-events-none",
            someSubActive && "bg-accent",
          )}
        >
          <Link href={item.href}>
            <span
              className={cn(
                "material-symbols-rounded group-hover:[--font-FILL:1]",
                (isActive || someSubActive) && "[--font-FILL:1]",
                isSmall ? "mr-0" : "mr-2",
              )}
              style={
                isActive || someSubActive
                  ? {
                      background: "linear-gradient(to right, #FF0033, #F50057)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : undefined
              }
            >
              {item.icon}
            </span>

            {!isSmall && (
              <span className="text-foreground text-lg font-medium">
                {item.title}
              </span>
            )}
          </Link>
        </Button>

        {item.subItems && (
          <>
            <div className="bg-secondary h-6 w-0.5 rounded-full" />

            <AccordionTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "[&>span]:text-foreground cursor-pointer",
              )}
            />
          </>
        )}
      </div>

      <AccordionContent className="text-foreground flex max-w-48 flex-col overflow-hidden pt-2 pl-6">
        {item.subItems?.map((subItem) => {
          const isSubActive = pathname === subItem.href;

          return (
            <Link
              className={cn(
                "hover:bg-accent/50 flex flex-1 flex-row items-center gap-2 rounded-md p-2",
                isSubActive && "bg-primary/14 pointer-events-none",
              )}
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
          );
        })}
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
