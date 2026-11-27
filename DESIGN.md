# Design rules

Read this before changing anything on the site. Claude and ChatGPT/Codex both follow it.
If a change breaks a rule here, it gets sent back, however good it looks.

## What the site is

Alex Buckner's personal website and living resume. Most visitors arrive from an
introduction, often on a phone, and decide in seconds whether he is credible.
The site's job is to confirm the introduction fast, then give depth to anyone who wants it.

The through-line is one sentence:

> I build products, the factory that makes them, the AI that runs the business,
> and the film that tells the story.

Those four parts are one stack, not four careers. Keep the four chapters on Home in that order.

## The look

- **White page, black type.** No dark mode. No grey-green, no purple, no gradients.
- **Frames, not cards.** Images and video sit in thin black frames (1.5px, 2px radius),
  like prints on a contact sheet. No rounded cards, no soft drop shadows.
- **Hairline rules** separate sections (1.5px black for chapters, 1px #C9C9CF inside them).
- **Four colors, used as a key only:**

  | Part | Color |
  |---|---|
  | Products and brands | red `#D6223A` |
  | Factory and manufacturing | orange `#E8590C` |
  | AI systems | blue `#1F5EFF` |
  | Photo and film | black `#000000` |

  Use them for underlines, chapter numbers, small keys and links. Never as large fills or backgrounds.
- **Yellow `#FFD60A`** marks only "To add" placeholders. It disappears when real content arrives.
- **Grey ground `#F4F4F6`** for the thesis band and empty frames.

## Type

| Role | Typeface | Notes |
|---|---|---|
| Headlines | Archivo, width 112 to 125, weight 700 | Free, Google Fonts |
| Reading text | Geist | Free, Google Fonts |
| Captions, numbers, timecode | Geist Mono, 13px | Free, Google Fonts |

- Body text 17px, line height 1.5, lines under about 70 characters.
- No all-caps labels. No letter-by-letter headline reveals.

## Words

- Plain, specific, first person. Short sentences.
- Headings say exactly what the section is. No marketing phrases, no clever titles.
- No invented numbers. If a number is not confirmed by Alex, it does not go on the site.
- No em dashes in copy.
- Cannabis and hemp are named plainly, once on Home and once on About.
  Everywhere else, describe the discipline: regulated consumer products, compliance, manufacturing.
- Confidential business data never appears. Screens use demo data and say so.

## Motion

One orchestrated moment per page. Everything else is still or nearly still.

- **Home:** the opening sentence is painted first and is readable with no animation.
  Underlines draw in (0.4s each, 0.12s apart), the frame opens (0.8s), then the four
  frames step through once (4s each) and stop. Hovering a word or tapping a button
  switches the frame.
- **Timing:** small feedback 100 to 150ms, interface changes 150 to 250ms, larger moves
  up to 300ms. Authored moments (the opening) 400 to 900ms per beat, fully settled by
  about 1.5 seconds.
- **Easing:** ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for things arriving.
  Ease-in-out for things moving on screen. Never ease-in.
- Animate only `transform` and `opacity` where possible.
- Buttons press to `scale(0.97)`.
- All motion lives inside `@media (prefers-reduced-motion: no-preference)`.
  With Reduce Motion on, nothing moves and nothing autoplays.
- Text and buttons are never hidden waiting for an animation or a scroll.

### Banned

Fade-and-slide-up on every section. Scroll hijacking or smooth-scroll libraries.
Custom cursors. Magnetic buttons. Parallax. Gradient blobs, glass, glows.
Generic 3D shapes. Stock footage or AI-generated images or video. Marquee tickers.
Icon grids. Skill bars. Counters that count up.

## Video and images

- Only Alex's own photos, footage, renders and screen recordings.
- Loops: 3 to 5 seconds, muted, `playsinline`, with a poster image, under about 1.5MB each.
  Encode AV1 (WebM) with an H.264 MP4 fallback.
- Only the first hero loop loads immediately; others load as they come near the screen.
- Every image has alt text. Every video with speech has captions.

## Building

- Plain HTML, CSS and a little JavaScript. No framework unless Alex approves one.
- Every page works on a phone at 375px wide, with keyboard navigation and visible focus.
- Every page has a title, a one-line description and a preview image.
