# Design brief — wahlflorian.com

Handoff companion to [`DESIGN.md`](DESIGN.md). Read that file first; it is the contract.

**This brief asks for page composition, not a design system.** The system is decided, measured, and
locked. What is not decided is what the pages look like — how the home page sequences, how
`/advisory` argues its case, how a long speaking list stays readable.

---

## 1. What is locked

`DESIGN.md` is a constraints file, not a mood board. Do not re-derive, re-explore, or "improve" any
of the following. If a comp requires breaking one of these, the comp is wrong.

| | Locked value |
|---|---|
| Accent | Copper `#9C4F21` light / `#D68B57` dark — **one hue, four permitted uses** (§2.4) |
| Canvas | Slate `#F5F6F8` light / `#101418` dark — never `#FFF`, never `#000` |
| Display | Instrument Sans 700 |
| Prose | Source Serif 4 |
| Chrome / data | Inter 400 · 500 · 700 |
| Weights | 400 / 500 / 700 only |
| Radius | 0 / 2 / 4px |
| Elevation | 1px rules or whitespace. **No `box-shadow`.** |
| Motion | 120ms, `cubic-bezier(.16,1,.3,1)`, state-change only |
| Type floor | 11px |
| Prose measure | 68ch |

Full token tables, contrast measurements, and the review checklist are in `DESIGN.md` §§2–10.
Contrast is verified by `tools/contrast.js` — any new color must pass it before it ships.

**The most likely failure mode of this handoff is palette drift** — a generated comp reaching for a
second accent, a tinted background, a soft shadow, or a rounder radius because those read as
"polished." They are the specific tells this project is built to avoid. One accent, hairlines, tight
radius, no shadows.

---

## 2. What to design

### 2.1 `/advisory` — the priority

The one page that doesn't exist today, and the reason for the whole refresh.

**Audience:** bank and credit-union product executives, fintech founders and heads of product, and
PE/VC teams running diligence on payments or data-access companies. They're evaluating whether a
conversation is worth an hour, not reading for pleasure.

**Job:** make the reader confident enough to start a conversation. Answer, in whatever order the
design argues best — what he advises on, who it's for, how an engagement is shaped, why him, and
what to do next.

**Constraint:** this page has exactly one CTA, and it appears at least twice without ever appearing
twice in the same viewport.

> **Content is not written yet — see §4.** Compose against the section shapes, not against invented
> copy. Do not treat placeholder engagement types or durations as real; they are not.

### 2.2 `/` — the home page

Personal, not commercial. Order is fixed in `DESIGN.md` §11.3: hero → bio → selected writing →
selected speaking → advisory band. The design question is proportion and rhythm, not sequence.

The advisory band is **one quiet line plus the CTA**, near the bottom. It must not compete with the
hero. Getting this restrained is the hard part.

### 2.3 The index pattern

`/articles`, `/experience`, and the speaking list share one problem: long chronological lists that
have to stay scannable. There are 10+ talks, 8 hosted essays, 6 external articles, and 7 roles.

Solve it once as a reusable pattern. Dates are tabular figures; the row is a 1px rule, not a card.

### 2.4 Article page

Long-form reading. Source Serif 4 at 68ch on `--surface`. Needs: title, date/reading time, body,
footnote or reference treatment, and a single advisory CTA in the footer — after the essay, never
interrupting it.

---

## 3. What to produce

1. **`/advisory` full page**, light and dark, desktop and mobile.
2. **`/` full page**, light and dark, desktop and mobile.
3. **The index pattern**, one comp, applied to the speaking list.
4. **Article page**, showing the prose surface class.
5. **Component states** — buttons (default/hover/focus/disabled), links in prose, nav active,
   index row. Focus rings must be visible and specified, not implied.

Both themes for everything. Dark is a token swap, not a separate design.

---

## 4. Blocked on content

**`/advisory` cannot be finished until this exists.** These are business decisions, not design ones,
and they must not be invented in a comp:

- [ ] What he advises on — the actual practice areas
- [ ] Who it's for — the buyer, stated plainly
- [ ] How engagements are shaped — formats, and whether durations or prices are named
- [ ] Why him — the credential argument, in his words
- [ ] What the CTA does — email, a booking link, or a form
- [ ] Rewritten bio — the current one in `constants/data.ts` violates `DESIGN.md` §8

Layout can be explored against section shapes in the meantime. Real copy will change the proportions,
so treat any comp built on placeholder text as provisional.

---

## 5. Review

Score the render, not the code. Squint at a screenshot before reading it.

Run every comp against the 16-item checklist in `DESIGN.md` §10. The ones most often missed:

- Exactly one accent hue, used only per §2.4 — links, one primary button, active nav, focus ring
- Links underlined, never marked by color alone
- Zero `box-shadow` used as elevation
- Density genuinely differs across chrome / index / prose
- No decorative heading icons, no emoji
- Copy passes the §8 ban list
