# Crazy Electric - Website UI Kit

## Overview
High-fidelity interactive prototype of the Crazy Electric marketing website. Built with React + Babel (no build step). Covers the full homepage layout with clickable navigation and a working contact form.

## Surfaces Covered
- **Homepage** - hero, services grid, about section, contact form
- No blog, no portal, no dashboard - this is a marketing/lead-gen site

## Components
| File | Description |
|---|---|
| `Header.jsx` | Sticky nav with logo, links, CTA phone button |
| `Hero.jsx` | Full-bleed photo hero with headline, CTAs, trust badges |
| `Services.jsx` | 6-up service grid + bottom CTA strip |
| `Footer.jsx` | 4-column footer with logo, services, areas, contact |
| `index.html` | Full prototype - includes About + Contact sections inline |

## Design Width
1200px max-width content, fluid layout. Designed for desktop; components flex-wrap for narrower viewports.

## Fonts
- **Display:** Barlow Condensed (700, 800, 900) - loaded from Google Fonts
- **Body:** Barlow (400, 500, 600, 700) - loaded from Google Fonts
- ⚠️ The logo uses a custom/proprietary condensed face. Barlow Condensed is the closest open-source substitute.

## Color Tokens (key)
- Background: `#0A0A0A`
- Surface: `#111111`, `#1A1A1A`
- Accent: `#1ADBD4` (teal)
- Text: `#FFFFFF`, `#CCCCCC`, `#666666`

## Usage
Open `index.html` directly in the browser - no build step needed. Components auto-load via Babel.
