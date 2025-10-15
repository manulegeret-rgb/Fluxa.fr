import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionBackground = "solid" | "muted" | "gradient";

const backgroundStyles: Record<SectionBackground, string> = {
  solid: "bg-background",
  muted: "bg-muted/10",
  gradient: "bg-gradient-to-b from-background/80 via-[hsl(217,40%,8%)]/80 to-background/90 backdrop-blur",
};

interface SectionProps {
  id?: string;
  background?: SectionBackground;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export const Section = ({
  id,
  background = "solid",
  className,
  containerClassName,
  children,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-20 lg:py-28",
        backgroundStyles[background],
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04)_0,_rgba(255,255,255,0)_70%)]"
      />
      <div
        className={cn(
          "container relative z-10 mx-auto max-w-6xl px-6",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;