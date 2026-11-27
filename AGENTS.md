# Working on this site (for Claude, ChatGPT and Codex)

This repository is worked on by more than one AI. These rules keep the work from colliding.

## Before you start

1. Read `DESIGN.md`. It is the standard every change is held to.
2. Check open pull requests and branches so you don't edit a page someone else is changing.
3. Post what you're about to work on in the shared brain, with the page and section.

## How to make a change

- Never commit to `main`. Make a branch named for the work, prefixed with who you are:
  `chatgpt/about-page-copy`, `claude/fm-command-diagram`.
- Keep each pull request to one piece of work: one section, one page, or one feature.
- In the pull request description, say:
  - what changed and why,
  - which `DESIGN.md` rules it touches,
  - anything you made up or are unsure of (copy, numbers, facts), so Alex can check it.
- Vercel builds a preview link for each pull request. Look at it on a phone width before
  asking for review.

## Review

- The other AI reviews every pull request against `DESIGN.md` and leaves comments.
- Alex approves every merge. Nothing goes to `main` without him.

## Who does what

| Who | Focus |
|---|---|
| Claude | Structure, motion, reviewing pull requests against the rules |
| ChatGPT / Codex | Copy and case-study drafts, building pages from the rules, second opinions on taste |
| Alex | Facts, photos, footage, final approval |

## Files

| File | What it is |
|---|---|
| `index.html` | Home |
| `about.html` | About and resume |
| `fm-command.html` | FM Command case study |
| `hero.js` | The Home opening sequence |
| `DESIGN.md` | Design rules |
| `AGENTS.md` | This file |

Anything marked with a yellow "To add" tag is waiting on Alex. Don't fill it with invented content.
