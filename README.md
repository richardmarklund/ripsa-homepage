# Ripsa — hemsida

Statisk marknadsföringssida för Ripsa (transkribering av föreläsningar).

## Sidor
- `index.html` — Hemsida (start)
- `for-larosaten.html` — För lärosäten
- `ladda-ner.html` — Ladda ner

## Teknik
Sidorna använder Claude Designs `x-dc`-runtime (`support.js`) som renderar
med React. React 18 (UMD) är vendrad lokalt under `vendor/` så sidan inte är
beroende av något externt CDN vid körning. Typsnitt laddas från Fontshare/Google Fonts.

## Lokal utveckling
```sh
python3 -m http.server 8000
# öppna http://localhost:8000
```

## Publicering
Publiceras via GitHub Pages från `main`-grenen (repo-roten). `.nojekyll`
säkerställer att alla filer serveras oförändrade.
