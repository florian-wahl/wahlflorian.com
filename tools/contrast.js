#!/usr/bin/env node
/**
 * Verifies every token pair in DESIGN.md against WCAG 2.2 AA.
 * Run after any token change, then update DESIGN.md §2.3.
 *
 *   node tools/contrast.js
 *
 * Exits non-zero if any pair fails, so it can gate CI.
 */

const relLuminance = (hex) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const ratio = (a, b) => {
  const [hi, lo] = [relLuminance(a), relLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const light = {
  canvas: "#F5F6F8",
  surface: "#ECEEF1",
  ink: "#101418",
  inkMuted: "#4C545C",
  rule: "#C8CED5",
  borderInteractive: "#7C8894",
  accent: "#9C4F21",
  accentHover: "#85421B",
  onAccent: "#F5F6F8",
};

const dark = {
  canvas: "#101418",
  surface: "#161B20",
  ink: "#E3E7EB",
  inkMuted: "#8F979F",
  rule: "#2E353D",
  borderInteractive: "#697583",
  accent: "#D68B57",
  accentHover: "#E5A578",
  onAccent: "#101418",
};

// [label, foreground, background, minimum, note]
const pairs = (t) => [
  ["ink / canvas", t.ink, t.canvas, 4.5, "headlines, body"],
  ["ink / surface", t.ink, t.surface, 4.5, "prose canvas"],
  ["ink-muted / canvas", t.inkMuted, t.canvas, 4.5, "lede, metadata"],
  ["ink-muted / surface", t.inkMuted, t.surface, 4.5, "article meta"],
  ["accent / canvas", t.accent, t.canvas, 4.5, "link"],
  ["accent / surface", t.accent, t.surface, 4.5, "link in prose"],
  ["on-accent / accent", t.onAccent, t.accent, 4.5, "primary button label"],
  ["on-accent / accent-hover", t.onAccent, t.accentHover, 4.5, "button label, hover"],
  ["border-interactive / canvas", t.borderInteractive, t.canvas, 3.0, "SC 1.4.11"],
  ["border-interactive / surface", t.borderInteractive, t.surface, 3.0, "SC 1.4.11"],
  ["focus ring / canvas", t.accent, t.canvas, 3.0, "SC 1.4.11 · AX-02"],
  ["focus ring / surface", t.accent, t.surface, 3.0, "SC 1.4.11 · AX-02"],
];

// Decorative dividers have no WCAG requirement, but below ~1.4:1 they
// vanish on low-quality displays. Advisory only — never fails the build.
const advisory = (t) => [["rule / canvas", t.rule, t.canvas, 1.4, "divider visibility"]];

let failures = 0;

for (const [theme, tokens] of [["LIGHT", light], ["DARK", dark]]) {
  console.log(`\n${theme}`);
  for (const [label, fg, bg, min, note] of pairs(tokens)) {
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(
      `  ${ok ? "PASS" : "FAIL"}  ${label.padEnd(30)} ${r.toFixed(2).padStart(6)}:1  min ${min}   ${note}`
    );
  }
  for (const [label, fg, bg, min, note] of advisory(tokens)) {
    const r = ratio(fg, bg);
    console.log(
      `  ${r >= min ? "ok  " : "note"}  ${label.padEnd(30)} ${r.toFixed(2).padStart(6)}:1  ~${min}   ${note}`
    );
  }
}

if (failures) {
  console.error(`\n${failures} pair(s) below the required ratio. Fix the tokens, then update DESIGN.md §2.3.\n`);
  process.exit(1);
}
console.log("\nAll token pairs meet WCAG 2.2 AA.\n");
