import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, delay = 0, duration = 0.65, y = 30, once = true, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          controls.start("visible");
          if (once) obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [controls, once, visible]);

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration, delay, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: React.ReactNode[];
  stagger?: number;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function RevealGroup({ children, stagger = 0.1, delay = 0, y = 24, className, style }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          controls.start("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [controls, visible]);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={container} className={className} style={style}>
      {children.map((child, i) => (
        <motion.div key={i} variants={itemVariant}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
