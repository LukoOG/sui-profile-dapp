import React from "react";
import { cn } from "@/app/lib/utils";

export function LandingCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // The root container
  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-slate-900/50 p-4 rounded-lg backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="w-2 h-2 bg-cyan-500 rounded-full "></div>
      {children}
    </div>
  );
}

export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // The root container
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // A padded header region
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  // The main title text
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  // A secondary description line
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Main body content (note the pt-0 to collapse into header if used together)
  return (
    <div
      className={cn(
        "p-6 pt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Footer area for actions, buttons, etc.
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}