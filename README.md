# Photography Portfolio

The portfolio site for Sriharsh Ganti's photography. It is a single static page with no build step and no dependencies.

## Chapters

| № | Chapter | What it does |
|---|---|---|
| ०१ | Light | The cover (#715) is lit by a lamp that follows the cursor. Clicking fires a flash, and a light meter reads the photo under the lamp. |
| ०२ | Withheld | The thesis reveals itself word by word. A torch moves across a wall of faceless portraits. A seven-blade iris opens over #914. |
| ०३ | The Ring | A dial selects twelve plates. It has hardware keys, an LCD readout and a colour palette pulled from each plate. |
| ०४ | Afterimage | You can paint a long exposure. A film roll develops from negative as it scrolls past, and a shutter-speed slider (1/1000 to 8 seconds) drags the light across eight frames. |
| ०५ | Contact sheet | Frames open under a loupe. The grease-pencil selects are saved per visitor. |
| ०६ | Archive | A masonry wall of 46 frames that can be filtered by Street, Motion, Light, Sea or Built. |
| ०७ | Contact | A stacked wordmark, with live clocks for India and Europe. |

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
