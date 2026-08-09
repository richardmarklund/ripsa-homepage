# Arbetssätt för den här sajten

## Git
Pusha **direkt till `main`**. Skapa inte pull request om användaren inte ber om
det. GitHub Pages publicerar från `main`, så en push är detsamma som att gå live.

## Språkversioner
Sidorna finns på svenska i roten och på engelska under `en/`:

| Svenska | Engelska |
|---|---|
| `index.html` | `en/index.html` |
| `for-larosaten.html` | `en/for-universities.html` |
| `ladda-ner.html` | `en/download.html` |
| `integritet.html` | `en/privacy.html` |
| `tillganglighet.html` | `en/accessibility.html` |

Ändras en text på ett språk ska motsvarigheten ändras i samma svep, så att
versionerna aldrig glider isär. Det gäller även `<title>`, `og:`-taggar och
metabeskrivningar.

## Skrivregler

**Tankestreck bär ton, aldrig struktur.** Ska strecket tala om hur något
förhåller sig till något annat är det fel verktyg, eftersom skärmläsare tolkar
tankestreck olika:

- Etikett + förklaring i lista: kolon. *"Skärmläsarstöd: VoiceOver och TalkBack."*
- Inskott som är en egen tanke: punkt, två meningar.
- Inskott som är en bisats: komma.
- Inskjuten uppräkning mellan två streck: parentes.
- Förtydligande i tabellcell: parentes.

Undantaget är en medveten retorisk paus i säljande text. Två sådana finns, båda
på startsidorna.

Sidtitlar använder tankstreck: `Sidnamn – Ripsa`. Samma tecken i `<title>` och
`og:title`.

Skriv "transkript", inte "transkription".

## Tillgänglighet
Sajten ska ha noll fel i axe-core. Kontrollera efter ändringar:

```sh
python3 -m http.server 8000
# kör axe-core mot varje sida i en riktig webbläsare
```

Kontrastkrav enligt WCAG 2.1 AA gäller all text. Textgrönt är `#347056`
(knappar `#347056`, hover `#2C5F46`); den ljusare `#3F8A66` används bara för
ikoner och logotyp, som bara behöver klara 3:1.

Skrivanimationen i startsidans demo är undantagen från
`prefers-reduced-motion` — den är kärnan i demon. Övriga animationer stängs av.

## Lokal utveckling
```sh
python3 -m http.server 8000
```
