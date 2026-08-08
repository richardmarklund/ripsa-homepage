# Ripsa — hemsida

Statisk marknadsföringssida för Ripsa (transkribering av föreläsningar).

## Sidor
- `index.html` — Hemsida (start)
- `for-larosaten.html` — För lärosäten
- `ladda-ner.html` — Ladda ner
- `integritet.html` — Integritetspolicy
- `tillganglighet.html` — Tillgänglighetsredogörelse (EN 301 549 / WCAG 2.1 AA)

## Engelsk version
Engelska versioner av alla sidor ligger under `en/`:
`en/index.html`, `en/for-universities.html`, `en/download.html`, `en/privacy.html`,
`en/accessibility.html`.

Varje sida har en flaggväxlare (SV/EN) uppe till höger i navbaren. Ett litet
skript i `<head>` på varje sida sköter språkval:
- Förstagångsbesökare med icke-svensk webbläsare omdirigeras från svenska
  sidor till motsvarande engelsk sida (botar undantas).
- Klick på en flagga (eller vidare navigering) sparas som språkval i
  `localStorage` (`ripsa-lang`) och respekteras vid kommande besök.
- Alla sidor har `hreflang`-taggar som pekar ut sin motsvarighet på det
  andra språket.

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
