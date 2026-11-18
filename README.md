# Photography Portfolio

The portfolio site for Sriharsh Ganti's photography. It is a single static page with no build step and no dependencies.

## Chapters

| № | Chapter | What it does |
|---|---|---|
| ०१ | Light | A random cover from eight frames in Best of the bunch, lit by a lamp that follows the cursor. Each click fires the shutter and swaps the cover. A light meter reads the photo under the lamp. |
| ०२ | Withheld | The thesis reveals itself word by word. A torch moves across a wall of faceless portraits. A seven-blade iris opens onto a mosaic of sixteen frames that flows through four grids. |
| ०३ | The Ring | A 24-hour dial in Devanagari, opening at the current hour in India. Each of eight parts of the day shows plates whose light belongs to it, large, with a palette pulled from each. |
| ०४ | Afterimage | Paint with light using eight long-exposure frames as brushes; the brush only changes when you click. A film roll develops from negative each time it passes, and a light table of outtakes can be dragged in any direction. |
| ०५ | Contact sheet | Frames open under a loupe. Grease-pencil selects become "Your edit" and open a print enquiry email with the frame numbers. |
| ०६ | Archive | A masonry wall of 92 frames, filtered by ten themes: Street, Motion, Light, Sea, Built, Night, Silhouette, Unfaced, Colour and Abstract. |
| ०७ | Contact | A stacked wordmark, live clocks for India and Europe, enquiry keys for commissions, prints and exhibitions, and an About section with field notes. |

Press `?` on the site to see the keyboard shortcuts.

## Structure

```
index.html
assets/css/site.css
assets/js/site.js
assets/img/<frame>.jpg   web exports, named by archive index
```

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Open the site through this server rather than as a file, because the light meter and the palettes read pixel data, which browsers only allow from a server.

## Live site

https://s-ganti.github.io/Photography-Portfolio/

This repository is public and GitHub Pages deploys from `main` at the root.

## Contact

- Email: gantisriharsh@gmail.com
- Instagram: [@Absurdly_yours](https://www.instagram.com/absurdly_yours/)

Fonts are Instrument Serif, Archivo, JetBrains Mono and Noto Sans Devanagari, all served by Google Fonts.
