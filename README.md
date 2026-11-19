# Photography Portfolio

The portfolio site for Sriharsh Ganti's photography. It is a single static page with no build step and no dependencies.

## Chapters

| № | Chapter | What it does |
|---|---|---|
| ०१ | Light | A cover from the Cover pics folder, lit by a lamp that follows the cursor (on phones: hold to expose). The shutter freezes the frame fully lit for a few seconds, then moves on; every cover shows once before any repeats. A light meter reads the photo under the lamp. |
| ०२ | Withheld | The thesis reveals itself word by word. A torch moves across a wall of faceless portraits. A seven-blade iris opens onto seven black-and-white frames shown one at a time: each new frame rises from a contact strip into focus inside an orange double-ruled gate. |
| ०३ | The Ring | A 24-hour dial in Devanagari, opening at the current hour in India. Each hour shows its own plate, three for each of the eight parts of the day, large, with a palette pulled from each. |
| ०४ | Afterimage | Paint with light using eight long-exposure frames as brushes; the brush only changes when you click. A film roll develops from negative each time it passes, and a light table of outtakes can be dragged in any direction. |
| ०५ | Contact sheet | Starts as an empty template with three steps. Visitors add frames from anywhere on the site; theme chips or light-table picks suggest more. Ends in a print enquiry email. |
| ०६ | Archive | A paged explorer (12 per page, 6 on phones) with ten theme filters, shuffle, swipe and keys. |
| ०७ | Contact | A stacked wordmark, live clocks for India and Europe, enquiry keys for commissions, prints and exhibitions, and an About section with a deck of field notes dealt three at a time, and a fortune slot of quotes. |

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

Fonts are Instrument Serif, Archivo, JetBrains Mono, Noto Sans Devanagari, Monoton, Rock Salt, Redacted Script and Gloock, all served by Google Fonts.
