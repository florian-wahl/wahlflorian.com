# DESIGN.md — wahlflorian.com

**Direction: Copper on Slate.** Committed constraints for the site refresh. Every agent, human or
model, reads this file *before* generating anything. Nothing here is a suggestion.

The method this file exists to serve: **commit the constraints first, generate inside them, then
art-direct the render.** You do not prompt your way out of generic design — you fence it out.

> **Status:** design system locked. Information architecture decided — see [§11](#11-information-architecture).
> Remaining open items in [§12](#12-open).

---

## 1. Non-negotiables

Violating any of these fails review. No exceptions, no "just this once."

**Color**
- Canvas is never `#FFFFFF`. Dark canvas is never `#000000` (halation).
- Exactly **one** accent hue. Copper. There is no secondary accent.
- No gradients. No mesh blobs, ambient glows, or glassmorphism.
- No color taken unmodified from a library default palette.

**Type**
- Two families minimum, with distinct roles: sans for chrome and data, serif for prose. Never one.
- Three weights only: **400 / 500 / 700**. No 300, no 600.
- Every date and figure carries `font-variant-numeric: tabular-nums lining-nums`.
- Nothing below **11px**, ever.
- Uppercase is reserved for labels ≤12px with tracking. Headlines are sentence case.

**Layout**
- Radius scale is `0 / 2 / 4px`. Nothing rounder.
- No `box-shadow` for elevation. Separation is a 1px rule or whitespace.
- Not everything is a card. Cards are for genuinely grouped, repeating content.

**Motion**
- 120ms, `cubic-bezier(0.16, 1, 0.3, 1)`, **state-change only**.
- No fade-in-on-scroll. No perpetual/looping animation. No no-op hovers.

**Icons**
- One set, one weight, functional only. No decorative icons on headings. No emoji as UI.

**Copy**
- See [§8](#8-copy-standard). The ban list is enforced.

---

## 2. Color

### 2.1 Primitives

Hand-mixed. Do **not** substitute Tailwind `slate-*` — the ramp below is deliberately warmer in the
mid-tones and darker at the top end.

```
--slate-50:  #F5F6F8    --copper-50:  #FBF2EC
--slate-100: #ECEEF1    --copper-100: #F5E0D2
--slate-200: #DFE3E8    --copper-200: #E9BE9F
--slate-300: #C8CED5    --copper-300: #D68B57
--slate-400: #A9B2BB    --copper-400: #C87742
--slate-500: #7C8894    --copper-500: #9C4F21
--slate-600: #6F7B88    --copper-600: #85421B
--slate-700: #4C545C    --copper-700: #6D3615
--slate-800: #333A42    --copper-800: #552A10
--slate-900: #1E242A    --copper-900: #3D1E0B
--slate-950: #101418
```

### 2.2 Semantic tokens

Components reference **only** these. A component that reaches past this layer to a primitive — or to
a raw hex — is a defect.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--canvas` | `#F5F6F8` | `#101418` | Page ground |
| `--surface` | `#ECEEF1` | `#161B20` | Prose canvas, elevation −1 |
| `--ink` | `#101418` | `#E3E7EB` | Headlines, body |
| `--ink-muted` | `#4C545C` | `#8F979F` | Lede, metadata, labels |
| `--rule` | `#C8CED5` | `#2E353D` | Decorative divider, 1px |
| `--border-interactive` | `#7C8894` | `#697583` | Button/input boundary |
| `--accent` | `#9C4F21` | `#D68B57` | Links, primary button, focus |
| `--accent-hover` | `#85421B` | `#E5A578` | Accent, hovered |
| `--on-accent` | `#F5F6F8` | `#101418` | Label on accent fill |

> **`--rule` and `--border-interactive` are not interchangeable.** A decorative divider has no
> contrast requirement; an interactive component boundary needs 3:1 under WCAG SC 1.4.11. Using
> `--rule` on a button border is the specific bug this split exists to prevent.

### 2.3 Measured contrast

All values computed, not estimated. Re-run on any token change.

**Light**

| Pair | Ratio | Gate |
|---|---|---|
| ink / canvas | 17.11:1 | AAA |
| ink / surface | 15.91:1 | AAA |
| ink-muted / canvas | 7.11:1 | AAA |
| ink-muted / surface | 6.62:1 | AA |
| accent / canvas | 5.46:1 | AA |
| accent / surface | 5.08:1 | AA |
| on-accent / accent | 5.46:1 | AA |
| on-accent / accent-hover | 6.95:1 | AAA |
| border-interactive / canvas | 3.34:1 | SC 1.4.11 |
| border-interactive / surface | 3.11:1 | SC 1.4.11 |
| rule / canvas | 1.47:1 | decorative |

**Dark**

| Pair | Ratio | Gate |
|---|---|---|
| ink / canvas | 14.88:1 | AAA |
| ink / surface | 13.94:1 | AAA |
| ink-muted / canvas | 6.25:1 | AA |
| ink-muted / surface | 5.86:1 | AA |
| accent / canvas | 6.77:1 | AAA |
| accent / surface | 6.35:1 | AA |
| on-accent / accent | 6.77:1 | AAA |
| on-accent / accent-hover | 8.80:1 | AAA |
| border-interactive / canvas | 3.94:1 | SC 1.4.11 |
| rule / canvas | 1.49:1 | decorative |

### 2.4 Where the accent is allowed

Exhaustive. If a use isn't on this list, it's not permitted.

1. Links in prose — **always with an underline**, never color alone (two-channel rule).
2. The single primary button per view.
3. Active nav item, 1px underline.
4. Focus ring, 2px + 2px offset.
5. **Section kickers** — the small uppercase label, plus its 16px leading tick.
6. **Hover state of a ghost button or a back-link** — the affordance resolves to accent.

Explicitly forbidden: tinted background fills, badges, pills, chart series, large headings, body
copy, icon color in indexes, hover backgrounds, a second copper shade for "variety."

**Why so tight:** a single-accent system degrades into a two-color system one reasonable-seeming
exception at a time. The restraint *is* the design.

**On rows 5–6.** Added after the first build read as under-accented — copper appeared only on one
button and one hover state, so the palette didn't register as a choice. The kicker is the right
place to spend it: every section already opens with one, so it distributes the accent evenly down
the page as a *structural* marker rather than decoration, and the tick gives the system a signature
motif. This is an expansion of where the single accent appears, not a second accent.

### 2.5 Theme

Light-first. Dark is a full token-mode swap, not a fork — primitives constant, semantics remapped.
Both modes ship together; neither is an afterthought. Never a dark hero over a light body.

---

## 3. Typography

### 3.1 Families

| Role | Face | Weights | Notes |
|---|---|---|---|
| Display | **Instrument Sans** | 700 | Headlines, wordmark, article titles, drop cap |
| Prose | **Source Serif 4** | 400, 600 | Article body, hero lede. Roman + italic |
| Chrome / data | **Inter** | 400, 500, 700 | Nav, labels, tables, buttons, metadata |

All three are self-hosted variable fonts in `fonts/`, latin subset, registered in
`styles/fonts.css`. No CDN — it costs a connection and a privacy footnote.

**Source Serif 4 ships without the `opsz` axis.** Prose renders at a single size on this site, so
optical sizing changes nothing visible and cost 150KB across the roman and italic files. Total font
payload is 241KB for five files.

**Deliberately absent: monospace.** Mono belongs to IDs, tickers, logs, and code. This site has
none, so mono here would be decoration — the exact misuse the rule exists to prevent. `Inter` with
`tabular-nums` does the alignment work.

### 3.2 Scale

Base 16px. **Floor is 11px (`0.6875rem`) and nothing goes below it.**

| Token | Size | Face | Weight | LH | Tracking | Use |
|---|---|---|---|---|---|---|
| `display-xl` | `clamp(2.1rem, 4.2vw, 3.15rem)` | Display | 700 | 1.05 | −0.028em | Hero h1 |
| `display-l` | `2rem` | Display | 700 | 1.1 | −0.028em | Page h1 |
| `display-m` | `1.6rem` | Display | 700 | 1.2 | −0.028em | Article title, h2 |
| `display-s` | `1.25rem` | Display | 700 | 1.3 | −0.02em | h3 |
| `prose` | `1.0625rem` | Prose | 400 | 1.62 | 0 | Article body, lede |
| `body` | `0.875rem` | Chrome | 400 | 1.55 | 0 | UI body |
| `body-s` | `0.8125rem` | Chrome | 400/500 | 1.5 | 0 | Cards, dense lists |
| `meta` | `0.8rem` | Chrome | 400 | 1.45 | 0 | Dates, secondary |
| `label` | `0.72rem` | Chrome | 500 | 1.4 | 0.10em | Nav, uppercase |
| `label-s` | `0.6875rem` | Chrome | 500 | 1.35 | 0.14em | Kickers, uppercase |

> `label-s` is exactly 11px. It was 10.88px in the prototype — under the floor. Do not round down.

### 3.3 Rules

- **Measure:** prose capped at **74ch**, via `max-w-prose`. This sits at the top of the 45–75ch
  readability range rather than at the classic 66ch ideal, which is a deliberate call — the
  narrower measure made the pages feel like they were wrapping early. What is non-negotiable is
  that prose is capped *somewhere*: the pre-refresh site ran body copy the full container width,
  which was its single worst readability defect.
- **Container** is `max-w-6xl` (1152px). At `5xl` the hero's left grid column capped the bio at
  65ch, under the site measure, because the column is narrower than `max-w-prose`.
- **Numerals:** `tabular-nums lining-nums` on all dates, durations, figures, and any column.
- **Uppercase:** only `label` and `label-s`, always with the tracking above. Never a headline.
- **Weight carries hierarchy** alongside size. Two sizes at different weights beat four sizes.
- **No drop cap.** Specified originally, then cut in build: it depends on which letter the author
  happened to open with. Narrow letterforms like `I` render as a stray vertical mark and misalign
  the first line. A decoration contingent on the content is not a system.

---

## 4. Space & layout

**Scale (4px base):** `4 8 12 16 20 24 32 40 48 64 80`. Nothing off-scale.

**Radius:** `0` rules and dividers · `2px` buttons, inputs, cards, chips · `4px` images and
figures. Nothing larger.

**Separation, in priority order:**
1. Whitespace.
2. A 1px `--rule`.
3. A `--surface` background shift.

There is no fourth option. **`box-shadow` is not an elevation tool on this site** — remove
`shadow-md`, `shadow-lg`, `shadow-xl` and the existing `pixel-*` offset shadows entirely.

**Density varies by surface class** (see §7) — a speaking index row and an article paragraph are not
the same density, and flattening them is a diagnostic defect.

---

## 5. Motion

```css
--ease: cubic-bezier(0.16, 1, 0.3, 1);
--dur:  120ms;   /* 200ms absolute maximum */
```

Animate **only** `opacity`, `transform`, `color`, `border-color`, `background-color`, and only to
signal a state change.

Forbidden: scroll-triggered fades, typing effects, looping pulses, glitch effects, parallax, skeleton
shimmer, hover effects that change nothing meaningful.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

**Migration note:** the current hero has a typewriter effect, a staggered fade-in, and an infinite
pulse on the tagline badges. All three are removed, not tuned.

---

## 6. Iconography

One set, one weight, functional only. Replace `@hackernoon/pixel-icon-library` — pixel icons
contradict the direction entirely.

- No icon on a heading unless it carries information the heading doesn't.
- No emoji in UI. Status and warning glyphs are engineered SVG.
- Icons inherit `currentColor` and never `--accent`.
- Social icons: one set at one weight, `--ink-muted`, → `--ink` on hover.

---

## 7. Surface classes

One token layer, three dialects. Density and separation follow the surface, not a global setting.

| | `chrome` | `index` | `prose` |
|---|---|---|---|
| **Where** | Nav, footer, buttons | Speaking, experience, article lists | Article body |
| **Face** | Inter | Inter | Source Serif 4 |
| **Size** | `label` / `body-s` | `body-s` / `meta` | `prose` |
| **Row / leading** | — | 0.72rem vertical padding | 1.62 |
| **Separation** | 1px rule | 1px rule per row | Whitespace |
| **Ground** | `--canvas` | `--canvas` | `--surface` |
| **Measure** | — | full | 74ch |

---

## 8. Copy standard

**Florian's own voice guide is the authority for prose written in his name.** It is installed as
the `florian-writing-style` skill; load it before drafting any site copy. Its hard rules apply
here, most consequentially:

| Rule | Applies to |
|---|---|
| **Minimize em dashes** — use parentheses, periods, or hyphens | All prose. This is his rule #1 |
| Short sentences, short paragraphs, cut words that don't earn their place | All prose |
| No corporate jargon ("leverage", "utilize", "going forward") | All prose |
| No AI-flavored phrasing ("navigate", "landscape", "it's worth noting") | All prose |
| Parenthetical asides for caveats and context | A signature move — use it |

**Where the two documents disagreed, the voice guide wins.** This section previously banned
tricolons; his guide lists **triple patterns as a signature move** ("better, faster, and fairer").
That ban is withdrawn. The bio's opening line — "trust, customer obsession, and continuous
learning" — is his own sentence and stays.

**Still banned, because these are interface-copy problems rather than voice:**

| Pattern | Example to avoid |
|---|---|
| Negation reframe | "not just a PM, but a strategist" |
| Empty superlative | "a rare mix of technical depth and strategic execution" |
| Noun-stacked heading | "Product Strategy Innovation Leadership" |
| Uniform section length | Every block padded to the same three sentences |

---

## 9. Accessibility gates

- **WCAG 2.2 AA.** Text 4.5:1, non-text UI 3:1, verified in both themes.
- **Focus:** 2px `--accent` ring + 2px offset, visible on every interactive element, never obscured
  by sticky headers (SC 2.4.11).
- **Two-channel encoding:** no meaning carried by color alone. Links get an underline.
- **Targets:** 24×24px minimum (SC 2.5.8).
- Keyboard-operable throughout; semantic markup; `prefers-reduced-motion` honored.

**Known defects in the current site, fixed by this work:**

| Issue | Measured | Needs |
|---|---|---|
| `text-yellow-400` on white | **1.53:1** | 4.5:1 |
| Article link `#CA8A04` on white | **2.94:1** | 4.5:1 |

---

## 10. Review checklist

Score the **render**, not the code. Squint at a screenshot first.

- [ ] No `#FFF` canvas, no `#000` canvas
- [ ] Exactly one accent hue, used only per §2.4
- [ ] Accent underlined wherever it marks a link
- [ ] Two type families, distinct roles
- [ ] Weights limited to 400 / 500 / 700
- [ ] `tabular-nums` on every date and figure
- [ ] Nothing below 11px
- [ ] Radius ≤4px everywhere
- [ ] Zero `box-shadow` used as elevation
- [ ] Prose ≤74ch
- [ ] No scroll-fade, no looping animation, no no-op hover
- [ ] No decorative heading icons, no emoji
- [ ] Density differs across chrome / index / prose
- [ ] Copy passes the §8 ban list
- [ ] Contrast re-measured in both themes
- [ ] Focus ring visible on every interactive element

---

## 11. Information architecture

**Target: personal home with a dedicated `/advisory` page.** The home page stays a personal site —
who he is, what he writes, where he speaks. `/advisory` carries the commercial offer. This lets the
advisory practice be tested and revised without recommitting the whole site.

**Iteration 1 (current) migrates the design only.** Existing content and page structure are kept
as-is; `/advisory` is deferred to iteration 2 (§12). Every token, component, and pattern below is
built now so that adding the page later is composition, not redesign.

### 11.1 Page inventory

| Route | Character | Primary job | CTA — iteration 1 | CTA — target |
|---|---|---|---|---|
| `/` | Personal | Establish who he is and the depth behind it | → `/contact` | → `/advisory` |
| `/advisory` | Commercial | Convert a qualified reader into a conversation | *deferred* | → contact / booking |
| `/articles` | Index | Surface the writing | → article | → article |
| `/articles/[slug]` | Prose | Deliver the essay | → `/contact`, footer | → `/advisory`, footer |
| `/experience` | Index | Career detail, résumé | → `/contact` | → `/advisory` |
| `/contact` | Utility | Direct contact | — | — |
| `/404` | Utility | Recover | → `/` | → `/` |

### 11.2 The advisory CTA

One CTA per page, never two. It reads as an invitation to talk, not a job-seeking action — "Start a
conversation," not "View résumé." **The résumé is not a homepage CTA**; it lives on `/experience`,
where a reader who wants it will look.

Until `/advisory` exists, the CTA points at `/contact`. This carries the advisory tone without
promising a page that isn't there. When `/advisory` ships, the target changes and nothing else does.

### 11.3 Home page order

Personal first, commercial last. The advisory band sits near the bottom as one quiet line plus the
CTA. It does not compete with the hero.

1. Hero — name, what he does, location, short positioning line
2. Bio
3. Selected writing — 3–4 items, → `/articles`
4. Selected speaking — 4–5 items, → full list
5. Advisory band — one line + CTA

### 11.4 Surface classes by page

| Route | `chrome` | `index` | `prose` |
|---|---|---|---|
| `/` | nav, footer, CTA | writing, speaking | bio, hero lede |
| `/advisory` | nav, footer, CTA | engagement list | body copy |
| `/articles` | nav, footer | article list | — |
| `/articles/[slug]` | nav, footer, meta | — | article body |
| `/experience` | nav, footer | role list | role descriptions |

---

## 12. Deferred to iteration 2

**`/advisory` — the page and its content.** What he advises on, how engagements are structured, who
they're for, and what the contact action does are business decisions, not design ones. Deferred
deliberately so the design migration can ship without waiting on them. Anything shown in a
prototype's "Engagements" card is placeholder and is **not** a commitment.

**Copy against §8.** The bio in `constants/data.ts` violates the ban list twice — "trust, customer
obsession, and continuous learning" is a tricolon, "a rare mix of technical depth and strategic
execution" is an empty superlative. Iteration 1 keeps existing content verbatim, so this ships
as-is and is fixed with the `/advisory` copy pass.

The `rainbowContent` taglines carry the same problem: "Thought Leader" is a self-applied superlative
and is the weakest of the five. Iteration 1 renders them as one quiet line rather than animated
badges, but does not edit the list.

**Wordmark / monogram.** An **FW** monogram or set wordmark would anchor the system for slides,
LinkedIn, and PDFs. Cheaper to define now than to bolt on later, but not blocking.

---

*Verified with `tools/contrast.js`. Re-run and update §2.3 on any token change.*
