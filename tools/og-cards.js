#!/usr/bin/env node
/**
 * Generates the social share cards (Open Graph / Twitter, 1200x630 PNG).
 *
 *   node tools/og-cards.js
 *
 * Writes `public/og/<slug>.png` for every `posts/*.md` and `public/og/default.png`
 * for every non-article page. Runs automatically via `predev` and `prebuild`.
 *
 * The output is build output: gitignored, never hand-edited. Change the layout
 * here and re-run. Output is deterministic (no timestamps), so the same posts
 * produce byte-identical files.
 *
 * Layout is built from plain objects and handed to satori (layout -> SVG), then
 * resvg turns the SVG into a PNG. No JSX and no browser. Colors are the dark
 * theme tokens (DESIGN.md §2.2), the F mark is the geometry from
 * `tools/favicon.js` without its tile, and fonts are the static latin .woff
 * files from @fontsource, since satori can't read woff2 or variable fonts.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const satori = require("satori").default || require("satori");
const { Resvg } = require("@resvg/resvg-js");
const sharp = require("sharp");

/* ---------- Tokens ---------- */

const CANVAS = "#101418"; // --canvas (dark)
const INK = "#E3E7EB"; // --ink
const MUTED = "#8F979F"; // --ink-muted
const RULE = "#2E353D"; // --rule
const ACCENT = "#D68B57"; // --accent

const W = 1200;
const H = 630;
const PAD = 80;

const ROOT = path.join(__dirname, "..");
const POSTS = path.join(ROOT, "posts");
const OUT = path.join(ROOT, "public", "og");

// Same geometry as tools/favicon.js, on its 16-unit grid.
const GRID = 16;
const RECTS = [
  { x: 4, y: 3, w: 2, h: 10 }, // stem
  { x: 6, y: 3, w: 6, h: 2 }, // top arm
  { x: 6, y: 7, w: 4, h: 2 }, // mid arm
];

/* ---------- Fonts ---------- */

const font = (pkg, file) =>
  fs.readFileSync(path.join(ROOT, "node_modules", "@fontsource", pkg, "files", file));

const FONTS = [
  { name: "Instrument Sans", data: font("instrument-sans", "instrument-sans-latin-700-normal.woff"), weight: 700, style: "normal" },
  { name: "Inter", data: font("inter", "inter-latin-400-normal.woff"), weight: 400, style: "normal" },
  { name: "Inter", data: font("inter", "inter-latin-500-normal.woff"), weight: 500, style: "normal" },
];

/* ---------- Layout helpers ---------- */

// satori requires an explicit display on every multi-child element.
const el = (type, style, children) => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});

function mark(size) {
  const u = size / GRID;
  return el(
    "div",
    { position: "relative", width: size, height: size },
    RECTS.map((r) =>
      el("div", {
        position: "absolute",
        left: r.x * u,
        top: r.y * u,
        width: r.w * u,
        height: r.h * u,
        background: ACCENT,
      })
    )
  );
}

// The default card sets the name as its headline, so its header is the mark
// alone; repeating the name there reads as a stutter.
const header = ({ name = true } = {}) =>
  el("div", { alignItems: "center", gap: 16 }, [
    mark(48),
    ...(name
      ? [el("div", { fontFamily: "Instrument Sans", fontWeight: 700, fontSize: 28, color: INK }, "Florian Wahl")]
      : []),
  ]);

const kicker = (label, date) =>
  el("div", { alignItems: "center" }, [
    el("div", { width: 40, height: 2, background: ACCENT, marginRight: 16 }),
    el(
      "div",
      { fontFamily: "Inter", fontWeight: 500, fontSize: 22, letterSpacing: "0.08em", color: ACCENT, textTransform: "uppercase" },
      label
    ),
    ...(date
      ? [el("div", { fontFamily: "Inter", fontWeight: 400, fontSize: 22, color: MUTED, whiteSpace: "pre" }, ` · ${date}`)]
      : []),
  ]);

const footer = () => [
  el("div", { width: "100%", height: 1, background: RULE, marginTop: 40 }),
  el("div", { fontFamily: "Inter", fontWeight: 400, fontSize: 24, color: MUTED, marginTop: 24 }, "wahlflorian.com"),
];

const card = (children) =>
  el(
    "div",
    { width: W, height: H, padding: PAD, boxSizing: "border-box", background: CANVAS, flexDirection: "column" },
    children
  );

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(value) {
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const titleSize = (len) => (len <= 60 ? 68 : len <= 90 ? 58 : 50);

/* ---------- Cards ---------- */

function articleCard(title, date) {
  return card([
    header(),
    el("div", { flex: 1 }), // flexible space
    kicker("Essay", date),
    el(
      "div",
      {
        fontFamily: "Instrument Sans",
        fontWeight: 700,
        fontSize: titleSize(title.length),
        lineHeight: 1.1,
        color: INK,
        maxWidth: 1000,
        marginTop: 24,
      },
      title
    ),
    ...footer(),
  ]);
}

async function defaultCard() {
  const png = await sharp(path.join(ROOT, "public", "headshot.webp"))
    .resize(300, 300)
    .png()
    .toBuffer();
  const src = `data:image/png;base64,${png.toString("base64")}`;

  return card([
    header({ name: false }),
    el("div", { flex: 1, alignItems: "center", justifyContent: "space-between" }, [
      el("div", { flexDirection: "column" }, [
        kicker("Product Leader"),
        el(
          "div",
          { fontFamily: "Instrument Sans", fontWeight: 700, fontSize: 84, lineHeight: 1.1, color: INK, marginTop: 24 },
          "Florian Wahl"
        ),
        el(
          "div",
          { fontFamily: "Inter", fontWeight: 400, fontSize: 30, lineHeight: 1.4, color: MUTED, maxWidth: 560, marginTop: 16 },
          "Fintech infrastructure: open banking, payments, and data access."
        ),
      ]),
      el("div", { width: 302, height: 302, border: `1px solid ${RULE}`, borderRadius: 4 }, [
        { type: "img", props: { src, width: 300, height: 300, style: { borderRadius: 3 } } },
      ]),
    ]),
    ...footer(),
  ]);
}

/* ---------- Render ---------- */

async function render(tree, file) {
  const svg = await satori(tree, { width: W, height: H, fonts: FONTS });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
  fs.writeFileSync(path.join(OUT, file), png);
  console.log(`og/${file}`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const slugs = fs.readdirSync(POSTS).filter((f) => f.endsWith(".md")).sort();
  for (const f of slugs) {
    const { data } = matter(fs.readFileSync(path.join(POSTS, f), "utf8"));
    await render(articleCard(String(data.title || ""), formatDate(data.date)), f.replace(/\.md$/, ".png"));
  }
  await render(await defaultCard(), "default.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
