# The Horror Hounds — Design Notes

## What this is

The Horror Hounds is a static site (plain HTML / CSS / JS — no build step, no frameworks) for a horror-movie fan meetup group in Orange County, CA. It lists the pack, points people to Discord and Instagram, shows upcoming gatherings, and archives the ~275 past events the group has run since 2021.

**Three key files:**
- `index.html` — the public site
- `event-manager.html` — a standalone in-browser tool for adding/editing upcoming events (writes to `events.json`)
- `events.json` — live data for new events; the historical archive lives separately in `js/events-data.js` (frozen)

The site is hosted on GitHub Pages. Adding a new event is a matter of opening `event-manager.html`, filling in the form, hitting **Save to events.json**, and committing.

---

## Design direction

The whole thing is themed like an **analog horror video artifact** — a late-night VHS tape you found at the bottom of a thrift-store bin. Everything visual leans into that: the tape itself, the tracking static, the red REC light, the flickering glow under the title. It is deliberately not subtle.

### Palette

| Role | Color | Where it shows up |
|---|---|---|
| Base black | `#0a0a0a` | Page background |
| Bone white | `#e8e0d8` | Body text, logo |
| Ash | `#8a8078` | Secondary text, muted labels |
| **Blood red** | `#c41e3a` | Accent — buttons, drips, glow, REC badge |
| Dried blood | `#8b1a2b` | Button hover, label stripe shadow |
| Occult purple | `#6b21a8` | Background gradient orb, chromatic aberration on title |

The red is used sparingly but always with a glow — the goal is that every accent feels a little bit lit from inside, like a neon motel sign.

### Typography

Three fonts, each with a specific job.

- **Creepster** — display only, used for *The Horror Hounds* on the VHS label and inside horror-flavored taglines. It's the loud, dripping-letters font. Never used for body copy.
- **Bebas Neue** — all section headings, buttons, event card titles, REC badge text, the "VOL. ∞" line. Tight, tall, letterspaced. This is the workhorse.
- **Space Grotesk** — all body copy, navigation, form inputs, descriptions. Clean and legible so the horror dressing doesn't become a usability problem.

---

## Signature elements

### The VHS tape frame (top of every page)

Fixed to the top of the viewport, 96px tall. Built entirely in HTML+CSS — no images. It sits above the navigation and stays visible on scroll. The cassette has:

- A dark plastic body with a highlight strip at the top and vent slits (repeating linear gradient)
- **Two reels** (62px) with conic-gradient spoke patterns that rotate continuously — the right reel spins the opposite direction at a slightly different speed, which is what a real VHS does
- A **magnetic tape strand** (brown/bronze gradient) running horizontally between the reels
- A **cream paper label** with the classic red top stripe, punched-hole pattern along the stripe, and "The Horror Hounds" in Creepster with a "VOL. ∞ · REC ● · SLP" sub-line
- Corner **screws** (radial gradient with a cross-head cut into them)
- A **write-protect tab** on the right edge
- A floating **REC badge** with a pulsing red dot

The whole thing has a subtle flicker animation (`vhsFlicker`) that kicks in a few times every six seconds to simulate tape tracking issues.

### Bat columns (left and right edges)

Fixed vertical strips along the outside of the page holding 4 static bat silhouettes each (SVG paths, inline in the HTML). They don't move — just hang there casting a faint red glow. Alternating left/right bats are mirrored and rotated slightly so they don't look stamped. Hidden on mobile because there's no room.

### CRT scanline overlay

A full-viewport fixed overlay of 2px-tall transparent / 1px-tall dark stripes, multiplied against the page content. Plus a **vignette** layer that darkens the corners. Both sit above almost everything but below the nav / VHS / modal. This is what makes the whole site read as "old TV" instead of just "dark website."

A body-level `bodyFlicker` animation briefly bumps page brightness up and down at random frame intervals — 1% of the time the whole page ghosts.

### Neon title

The hero headline *Horror Hounds* uses a split text-shadow (+2px red, -2px purple) that reads as **chromatic aberration** — the same cheap effect horror posters use to signal "something is wrong with this signal." A dedicated `heroNeonFlicker` animation briefly dims and jitters the title every few seconds.

### Blood-drip section underlines

Every section heading (*Who We Are*, *Upcoming Events*, *Past Events*) gets a red drip shape underneath, drawn with an inline SVG set as a `background-image` on the `::after` pseudo-element. The SVG is a horizontal bar with three or four teardrop shapes and a couple of detached droplets, all with a red drop-shadow filter. Replaces the old generic `.title-accent` line.

### Event cards

Cards look like frames from a VHS capture:
- **Scanline overlay** across the top 60% (same stripe pattern as the CRT)
- A small **"REC ●"** tag pinned in the top-right corner of every card
- On hover: red-tinted glow shadow instead of a plain lift

### Navigation

- Transparent by default; on scroll it gets a near-black translucent background with a faint red hairline on the bottom
- The Instagram link is an icon only; the Discord "Join" button has its own slightly-different pill treatment with a red wash
- Logo has a permanent red text-shadow glow

### Buttons

Two variants:
- `.btn-primary` — solid red, inner border, red glow that intensifies on hover
- `.btn-outline` — transparent, bone-white text, red border on hover

The buttons always animate their glow, never their geometry (no translateY on hover) — it keeps the interaction feeling electric rather than springy.

---

## Layout

The site is a single-page vertical scroll with four sections: **Hero** → **About** (Who We Are) → **Upcoming Events** → **Past Events**. Below past events sits the footer with Discord + Instagram CTAs.

Past Events has three tools the user can reach for:
1. **Filter pills** across categories (Movie Night / Goth Night / Festival / etc.)
2. **Search** by title, description, or location
3. **Load More** pagination, 20 events at a time

Clicking any event opens a **modal** with the full description, date, time, location, attendee count, and image.

---

## Responsive breakpoints

- **`<= 900px`** — About section drops to single column; footer collapses to 2 cols; VHS shrinks to 80px, reels and label scale with it; bats shrink
- **`<= 640px`** — Nav becomes a slide-in drawer below the VHS; VHS shrinks to 68px and loses the screws, write-protect tab, and REC badge; bats disappear entirely; CRT overlay intensity drops for readability

---

## Data shape

New events live in `events.json`:

```json
{
  "id": 1,
  "title": "Halloween Night Out @ The Frida",
  "date": "2026-10-31",
  "time": "7:00 PM",
  "venue": "The Frida Cinema",
  "address": "305 E 4th St, Santa Ana, CA",
  "description": "…",
  "attendees": 0,
  "image": "images/events/e1.jpg",
  "category": "Holiday",
  "status": "upcoming",
  "cancelled": false
}
```

The site merges these with the archived events in `js/events-data.js` at load time — upcoming events get their own grid above "Past Events," and past-dated managed events fall into the archive alongside the historical ones.

---

## Things deliberately left out

- **No framework.** Everything is vanilla. No React, no build step, no package.json. A non-coder with GitHub Pages access and a web browser can run this whole operation.
- **No tracking / analytics.**
- **No Meetup links.** Discord and Instagram only.
- **No dark-mode toggle.** The site only has one mode, and it is *haunted*.
