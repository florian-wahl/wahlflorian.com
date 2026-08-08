/**
 * Token mapping for DESIGN.md. Colors resolve to CSS custom properties defined
 * in styles/globals.css, so light/dark is a token swap rather than a class fork.
 *
 * `borderRadius` and `fontFamily` are overridden rather than extended — the
 * point is that `rounded-xl` and `font-mono` stop existing.
 */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    // Radius scale is capped at 4px (§4). Nothing rounder is reachable.
    borderRadius: {
      none: "0",
      sm: "2px",
      DEFAULT: "2px",
      md: "2px",
      lg: "4px",
    },
    // Two families with distinct roles, plus Inter for chrome (§3.1).
    // There is deliberately no `mono` — see DESIGN.md §3.1.
    fontFamily: {
      display: ["'Instrument Sans var'", "system-ui", "sans-serif"],
      prose: ["'Source Serif 4 var'", "Georgia", "serif"],
      sans: [
        "'Inter var'",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
        },
        rule: "var(--rule)",
        interactive: "var(--border-interactive)",
        overlay: "var(--overlay)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        "on-accent": "var(--on-accent)",
      },
      // Type scale from §3.2. Floor is 11px — nothing below label-s.
      fontSize: {
        "display-xl": ["clamp(2.1rem, 4.2vw, 3.15rem)", { lineHeight: "1.05", letterSpacing: "-0.028em" }],
        "display-l": ["2rem", { lineHeight: "1.1", letterSpacing: "-0.028em" }],
        "display-m": ["1.6rem", { lineHeight: "1.2", letterSpacing: "-0.028em" }],
        "display-s": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        prose: ["1.0625rem", { lineHeight: "1.62" }],
        body: ["0.875rem", { lineHeight: "1.55" }],
        "body-s": ["0.8125rem", { lineHeight: "1.5" }],
        meta: ["0.8rem", { lineHeight: "1.45" }],
        label: ["0.72rem", { lineHeight: "1.4", letterSpacing: "0.10em" }],
        "label-s": ["0.6875rem", { lineHeight: "1.35", letterSpacing: "0.14em" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionDuration: {
        DEFAULT: "120ms",
        120: "120ms",
        200: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.16, 1, 0.3, 1)",
        system: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
