import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
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
import { LazyImage } from "../lazy-image";

interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  forceExpandedItems?: boolean;
}

export function SideNav(props: SideNavProps) {
  const { isSideNavCollapsed } = useHeader();

  return (
    <nav
      className={cn(
        "flex flex-col items-start gap-2 transition-all",
        isSideNavCollapsed ? "w-9" : "w-56",
        props.className,
      )}
      {...props}
    >
      <Accordion type="multiple">
        <div className="flex flex-col gap-2 p-2">
          {sidebarNavItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              forceExpandedItem={props.forceExpandedItems}
            />
          ))}
        </div>
      </Accordion>
    </nav>
  );
}

function NavItem({
  item,
  forceExpandedItem,
}: {
  item: SidebarNavItem;
  forceExpandedItem?: boolean;
}) {
  const { isSideNavCollapsed } = useHeader();
  const isSmall = forceExpandedItem ? false : isSideNavCollapsed;

  const pathname = usePathname();
  const isActive = pathname === item.href;
  const someSubActive = item.subItems?.some((subItem) =>
    pathname.startsWith(subItem.href),
  );

  const navItemElement = (
    <AccordionItem value={item.href} style={{ border: 0 }}>
      <div className="flex w-full items-center justify-between gap-1">
        <Link
          href={item.href}
          className={cn(
            buttonVariants({
              variant: isActive ? "default" : "ghost",
              size: isSmall ? "icon" : "default",
            }),
            "group flex-1",
            !isSmall && "justify-start px-3",
            isActive && "pointer-events-none",
            someSubActive && "bg-accent",
          )}
        >
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
            <span className="text-foreground text-[1.06rem] font-medium">
              {item.title}
            </span>
          )}
        </Link>

        {item.subItems && (
          <>
            <div className="bg-secondary h-6 w-[1px] rounded-full" />

            <AccordionTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "[&>span]:text-foreground cursor-pointer decoration-transparent",
              )}
            />
          </>
        )}
      </div>

      <AccordionContent className="text-foreground flex flex-col overflow-hidden pt-2">
        {item.subItems?.map((subItem) => {
          const isSubActive = pathname === subItem.href;

          return (
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start text-base",
                isSubActive && "bg-primary/14 pointer-events-none",
              )}
              key={subItem.href}
              href={subItem.href}
            >
              <LazyImage
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
        <TooltipTrigger asChild>{navItemElement}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center">
          {item.title}
        </TooltipContent>
      </Tooltip>
    );
  }

  if (item.divider) {
    return (
      <>
        {navItemElement}
        <div
          key={`side-nav-divider-${item.href}`}
          className="bg-muted h-[1px] w-full rounded-full"
        />
      </>
    );
  }

  return navItemElement;
}
