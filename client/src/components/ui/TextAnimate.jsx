import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils.js";

const staggerTimings = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
  },
};

export function TextAnimate({
  children,
  delay = 1,
  duration = 1,
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  ...props
}) {
  const segments = useMemo(() => {
    switch (by) {
      case "word":
        return children.split(/(\s+)/);
      case "character":
        return children.split("");
      case "line":
        return children.split("\n");
      default:
        return [children];
    }
  }, [children, by]);

  const finalVariants = {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: duration / segments.length,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          staggerChildren: duration / segments.length,
          staggerDirection: -1,
        },
      },
    },
    item: animationVariants[animation] || defaultItemVariants,
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        variants={finalVariants.container}
        initial="hidden"
        whileInView={startOnView ? "show" : undefined}
        animate={startOnView ? undefined : "show"}
        exit="exit"
        className={cn("whitespace-pre-wrap", className)}
        viewport={{ once }}
        {...props}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={finalVariants.item}
            className={cn(
              by === "line" ? "block" : "inline-block whitespace-pre",
              segmentClassName
            )}
          >
            {segment}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
