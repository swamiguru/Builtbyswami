/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useTransform } from "motion/react";

interface ScrollProgressProps {
  className?: string;
}

/**
 * ScrollProgress
 * Renders a smooth reading progress indicator along the top edge of the screen.
 * Tracks viewport scroll progress and animates smoothly with spring physics,
 * applying a subtle box-shadow glow when the user reaches the end of the page.
 */
export default function ScrollProgress({ className = "" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
    restDelta: 0.001,
  });

  // Subtle box-shadow glow that activates as the user nears and reaches the bottom of the page
  const boxShadow = useTransform(
    scaleX,
    [0, 0.85, 0.96, 1],
    [
      "0 0 0px rgba(0, 109, 59, 0)",
      "0 1px 4px rgba(0, 109, 59, 0.15)",
      "0 2px 10px rgba(0, 109, 59, 0.45), 0 0 14px rgba(149, 247, 178, 0.5)",
      "0 2px 14px rgba(0, 109, 59, 0.65), 0 0 20px rgba(149, 247, 178, 0.8)",
    ]
  );

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-m3-primary z-50 origin-left pointer-events-none ${className}`}
      style={{
        scaleX,
        boxShadow,
      }}
      aria-hidden="true"
    />
  );
}

