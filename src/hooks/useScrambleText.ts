/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Terminal-style decode effect, ported from the "PRODUCT BUILDER" scramble
 * on the About page. That version loops every 12s, which suits a personal-
 * brand identity mark; this fires once (on mount, or whenever `active`
 * flips true) since it's meant for page headings — a repeating distraction
 * works against a site whose whole job is fast scanning. Spaces are never
 * scrambled, so multi-word labels keep their word breaks throughout the
 * animation. Respects prefers-reduced-motion by skipping straight to the
 * final text.
 */
import { useEffect, useState } from "react";

const SCRAMBLE_CHARS = "01/_*<>[]{}$&#!%";

export function useScrambleText(target: string, active = true): string {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!active) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(target);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      iterations += 0.3;
      // Stop as soon as every position would resolve correctly, and set the
      // exact target string directly — don't rely on the reveal math below
      // to land on it by coincidence. This is the only line that guarantees
      // the animation always ends reading the real text, character for
      // character, no matter how the iteration count landed.
      if (iterations >= target.length) {
        setDisplay(target);
        clearInterval(interval);
        return;
      }
      setDisplay(
        target
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < Math.floor(iterations)) return target[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
    }, 40);

    return () => clearInterval(interval);
  }, [target, active]);

  return display;
}
