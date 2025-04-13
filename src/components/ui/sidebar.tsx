
import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  side: "left" | "right";
}

const SidebarContext = React.createContext<SidebarContextProps>({
  open: true,
  setOpen: () => {},
  side: "right",
});

export function SidebarProvider({
  children,
  defaultOpen = true,
  side = "right",
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  side?: "left" | "right";
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <SidebarContext.Provider value={{ open, setOpen, side }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarTrigger() {
  const { setOpen } = useSidebarContext();
  return (
    <button
      type="button"
      className="p-2 rounded-md text-gray-500 hover:text-gray-700"
      onClick={() => setOpen((open) => !open)}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
}

export function Sidebar({
  className,
  children,
  side,
  ...props
}: React.ComponentPropsWithoutRef<"aside"> & {
  side?: "left" | "right";
}) {
  const { open, side: contextSide } = useSidebarContext();
  const sideUsed = side || contextSide;

  return (
    <aside
      className={cn(
        "w-[250px] h-screen flex flex-col bg-sidebar text-sidebar-foreground border-sidebar-border transition-all duration-300 z-10",
        open ? "translate-x-0" : sideUsed === "left" ? "-translate-x-full" : "translate-x-full",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("p-4 border-b border-sidebar-border", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex-1 overflow-auto py-2", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarFooter({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("p-4 border-t border-sidebar-border", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarGroup({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "px-3 py-2 text-xs font-medium tracking-wider text-sidebar-foreground/50 uppercase",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarGroupContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function SidebarMenu({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn("space-y-1 px-1 py-1", className)}
      role="menu"
      {...props}
    >
      {children}
    </ul>
  );
}

export function SidebarMenuItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li className={cn("", className)} role="none" {...props}>
      {children}
    </li>
  );
}

export function SidebarMenuButton({
  className,
  children,
  isActive,
  asChild,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  isActive?: boolean;
  asChild?: boolean;
}) {
  const Comp = asChild ? React.Fragment : "button";
  const childProps = asChild
    ? {}
    : {
        role: "menuitem",
        className: cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          className
        ),
        ...props,
      };

  return <Comp {...childProps}>{children}</Comp>;
}
