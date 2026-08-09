#!/usr/bin/env node
/**
 * Generates the favicon set from one geometry definition.
 *
 *   node tools/favicon.js
 *
 * The mark is an `F` monogram in copper on slate — the two arms read as the
 * kicker tick repeated at two lengths, which is the system's signature motif
 * (DESIGN.md §2.4). Colors are the `--ink` / `--accent` dark-theme pair, so the
 * tile is legible against light and dark browser chrome alike.
 *
 * Everything is axis-aligned on a 16-unit grid, so at 16/32/48px every edge
 * lands on a whole pixel and the mark needs no anti-aliasing to stay crisp.
 * That is also why the rasterizer here is 40 lines of zlib rather than a
 * dependency: hand-snapped rectangles beat a general SVG renderer at tab size.
 *
 * Re-run after any change to `--ink` or the dark `--accent`.
 */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

/* ---------- Geometry ---------- */

// A 16-unit grid. Every feature is 2 units, so the mark holds together at 16px
// where 2 units is 2 physical pixels.
const GRID = 16;
const GROUND = "#101418"; // --ink
const MARK = "#D68B57"; // dark-theme --accent

// Stem, then the long arm and the short arm. Both arms start inside the stem so
// the glyph is one contiguous shape.
const RECTS = [
  { x: 4, y: 3, w: 2, h: 10 }, // stem
  { x: 6, y: 3, w: 6, h: 2 }, // top arm  — the long rule
  { x: 6, y: 7, w: 4, h: 2 }, // mid arm  — the short tick
];

const OUT = path.join(__dirname, "..", "public");

/* ---------- Rasterizer ---------- */

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/**
 * Renders the mark at `size` as a raw RGBA buffer. Coordinates are scaled off
 * the 16-unit grid and rounded, which is exact whenever `size` is a multiple
 * of 16 and within half a pixel otherwise.
 */
function raster(size) {
  const ground = hexToRgb(GROUND);
  const mark = hexToRgb(MARK);
  const px = Buffer.alloc(size * size * 4);

  for (let i = 0; i < size * size; i++) {
    px[i * 4] = ground[0];
    px[i * 4 + 1] = ground[1];
    px[i * 4 + 2] = ground[2];
    px[i * 4 + 3] = 255;
  }

  const snap = (v) => Math.round((v * size) / GRID);
  for (const r of RECTS) {
    const x0 = snap(r.x);
    const y0 = snap(r.y);
    const x1 = snap(r.x + r.w);
    const y1 = snap(r.y + r.h);
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * size + x) * 4;
        px[i] = mark[0];
        px[i + 1] = mark[1];
        px[i + 2] = mark[2];
      }
    }
  }
  return px;
}

/* ---------- PNG encoder ---------- */

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

const crc32 = (buf) => {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};

const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

function png(size) {
  const rgba = raster(size);

  // Prepend the per-scanline filter byte (0 = None). The image is flat color,
  // so deflate collapses it regardless of filter choice.
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  // 10–12: compression, filter, interlace — all 0.

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- ICO container ---------- */

/** Packs PNGs into an ICO. PNG-in-ICO is Vista+ and universal in browsers. */
function ico(sizes) {
  const images = sizes.map(png);
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);

  let offset = 6 + sizes.length * 16;
  const dir = sizes.map((size, i) => {
    const e = Buffer.alloc(16);
    e[0] = size === 256 ? 0 : size; // 0 encodes 256
    e[1] = size === 256 ? 0 : size;
    e[2] = 0; // palette count
    e[3] = 0; // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(images[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += images[i].length;
    return e;
  });

  return Buffer.concat([header, ...dir, ...images]);
}

/* ---------- SVG ---------- */

const svg = () =>
  [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GRID} ${GRID}" role="img" aria-label="Florian Wahl">`,
    `  <rect width="${GRID}" height="${GRID}" fill="${GROUND}"/>`,
    ...RECTS.map(
      (r) => `  <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${MARK}"/>`
    ),
    `</svg>`,
    ``,
  ].join("\n");

/* ---------- Emit ---------- */

const manifest = {
  name: "Florian Wahl",
  short_name: "F. Wahl",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: GROUND,
  background_color: "#F5F6F8", // --canvas
  display: "browser",
};

const files = [
  ["favicon.ico", ico([16, 32, 48])],
  ["favicon.svg", svg()],
  ["apple-touch-icon.png", png(180)],
  ["icon-192.png", png(192)],
  ["icon-512.png", png(512)],
  ["site.webmanifest", JSON.stringify(manifest, null, 2) + "\n"],
];

for (const [name, data] of files) {
  fs.writeFileSync(path.join(OUT, name), data);
  const bytes = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
  console.log(`  public/${name.padEnd(22)} ${bytes.toLocaleString()} bytes`);
}
