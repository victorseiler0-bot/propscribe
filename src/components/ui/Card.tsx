import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  shine?: boolean;
}

export default function Card({ className, glow, shine, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.06)_inset] overflow-hidden transition-all duration-300",
        glow && "shadow-[0_0_40px_rgba(245,158,11,0.08),0_4px_24px_rgba(0,0,0,0.4)]",
        "hover:border-white/[0.14]",
        className
      )}
      {...props}
    >
      {shine && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />
      )}
      {children}
    </div>
  );
}
