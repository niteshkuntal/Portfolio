# Portfolio

Personal portfolio for Nitesh Kuntal, built with React + Vite, GSAP ScrollTrigger and React Three Fiber.

## Editing the content

You can edit everything from the GitHub website or app, no computer needed:

- **`src/data/site.js`** — your name, title, intro text, skills, email and links.
- **`src/data/projects.js`** — your case studies. The three included projects are samples; replace them and set `placeholder: false`.

Every change you commit to `main` rebuilds and redeploys the site automatically (takes about 1–2 minutes). Check progress under the repo's **Actions** tab.

## Hosting

The site is deployed for free with GitHub Pages using `.github/workflows/deploy.yml`.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## What's inside

- **Hero** — a WebGL point cloud (one custom shader) that morphs from a sphere into a wave as you scroll. It only loads on devices with WebGL, uses fewer points on phones, pauses when off screen, and is replaced by a static shape when "Reduce Motion" is on.
- **Work** and **case studies** — case study pages live at `#/work/<slug>` so they work on static hosting.
- **Fonts** — Bricolage Grotesque (display) and Newsreader (body), loaded from Google Fonts.

## Running locally (optional, needs a computer)

```bash
npm install
npm run dev
```
