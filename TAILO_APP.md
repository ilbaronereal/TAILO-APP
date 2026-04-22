# TAiLO App — Documentazione

## Cos'è TAiLO

TAiLO è un'app mobile-first per i proprietari di animali domestici. Permette di gestire i propri pet, trovare servizi nelle vicinanze (veterinari, toelettatura, ecc.) e tenere traccia degli appuntamenti in un'agenda integrata.

L'app è stata progettata in Figma ed esportata come progetto React/Vite.

---

## Stack tecnologico

| Tecnologia | Versione | Ruolo |
|---|---|---|
| React | 18.3.1 | UI framework |
| Vite | 6.3.5 | Bundler / dev server |
| React Router | 7.13.0 | Navigazione tra pagine |
| Tailwind CSS | 4.1.12 | Stili utility-first |
| shadcn/ui (Radix UI) | varie | Componenti UI accessibili |
| Lucide React | 0.487.0 | Icone |
| TypeScript | via Vite | Tipizzazione |

---

## Struttura del progetto

```
Tailo App/
├── src/
│   ├── main.tsx              # Punto di ingresso React
│   ├── app/
│   │   ├── App.tsx           # Root con RouterProvider
│   │   ├── routes.ts         # Definizione delle rotte
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Homepage
│   │   │   ├── PetProfile.tsx    # Profilo proprietario + lista pet
│   │   │   ├── PetDetail.tsx     # Scheda dettaglio singolo pet
│   │   │   ├── CategoryList.tsx  # Lista servizi per categoria
│   │   │   ├── ServiceDetail.tsx # Dettaglio singolo servizio
│   │   │   └── Agenda.tsx        # Agenda appuntamenti
│   │   └── components/
│   │       ├── Layout.tsx        # Layout con navbar in basso
│   │       ├── MapView.tsx       # Mappa stilizzata dei servizi
│   │       └── ui/               # Componenti shadcn/ui
│   ├── imports/              # Immagini (cane-1.jpg, logo, ecc.)
│   └── styles/
│       ├── index.css         # Entry CSS (importa gli altri)
│       ├── theme.css         # Variabili colori e tipografia
│       ├── tailwind.css      # Import Tailwind
│       └── fonts.css         # Font (Poppins)
├── index.html
├── package.json
└── vite.config.ts
```

---

## Rotte (pagine)

| Percorso | Componente | Descrizione |
|---|---|---|
| `/` | `Home` | Homepage con card pet, appuntamenti, categorie servizi |
| `/pet-profile` | `PetProfile` | Profilo proprietario + carosello dei pet |
| `/pet/:petId` | `PetDetail` | Scheda completa del pet (peso, altezza, info mediche) |
| `/category/:categoryId` | `CategoryList` | Lista / mappa dei servizi per categoria |
| `/service/:serviceId` | `ServiceDetail` | Dettaglio struttura: orari, contatti, servizi offerti |
| `/agenda` | `Agenda` | Calendario appuntamenti con modal per aggiungerne |

Tutte le pagine sono avvolte dal componente `Layout` che mostra la **navbar fissa in basso** con tre tab: Home, Agenda, Profilo.

---

## Design e colori

Il tema è warm & pastel, centrato su tonalità arancioni/corallo. I colori sono definiti come variabili CSS in `src/styles/theme.css`:

| Variabile | Valore | Uso |
|---|---|---|
| `--pastel-orange` | `#E87657` | Colore primario, CTA, navbar attiva |
| `--pastel-orange-dark` | `#D65A3E` | Header pagine secondarie |
| `--pastel-coral` | `#FFB892` | Gradiente card pet |
| `--pastel-peach` | `#FFD4B8` | Badge appuntamenti, icone |
| `--pastel-mint` | `#B8E0D4` | Icone verde, bottone agenda |
| `--pastel-lavender` | `#D4C5FF` | Badge viola |
| `--pastel-blue` | `#B8D4FF` | Icone blu |
| `--pastel-green` | `#C5E8B8` | Stato "Attiva" (assicurazione) |
| `--pastel-pink` | `#FFB8D4` | Categoria Shop |
| `--background` | `#FAF7F5` | Sfondo generale caldo/crema |

Font: **Poppins** (Google Fonts), con border-radius arrotondati (`--radius: 1rem`).

---

## Pagine nel dettaglio

### Home (`/`)
- Logo TAiLO in alto a sinistra
- Nome utente ("Roberta") e campanella notifiche
- **Card pet corrente** con carosello (frecce sinistra/destra, indicatori pallini) — clic naviga a `/pet-profile`
- **Prossimi appuntamenti**: 2 card fisse (24 Apr e 26 Apr) — clic naviga a `/agenda`
- **Griglia 2 colonne** con 8 categorie di servizi cliccabili (Veterinario, Toilettatura, Nutrizione, Pet Sitting, Dog Walking, Pensioni, Addestramento, Shop)
- Barra di ricerca (non ancora funzionale)

### PetProfile (`/pet-profile`)
- Header gradiente arancione con avatar proprietario
- **Informazioni personali** (telefono, email, indirizzo) con modalità editing toggle
- **Carosello pet** con card cliccabile che naviga a `/pet/:id`
- Pulsante "Salva modifiche" visibile solo in modalità editing

### PetDetail (`/pet/:petId`)
- Immagine full-width del pet (o emoji di fallback)
- Card informazioni: peso, altezza, colore
- Descrizione narrativa del pet
- Card comportamento (personalità, livello energia)
- Card informazioni mediche (veterinario, microchip, assicurazione)
- Bottoni "Agenda" e "Cartella clinica"

### CategoryList (`/category/:categoryId`)
- Header arancione con nome categoria
- Toggle **Lista / Mappa**
  - Lista: card servizi con rating stelle, distanza, indirizzo, orari
  - Mappa: implementazione custom con SVG (griglia strade stilizzata) e marker cliccabili con popup al hover
- I dati mockati sono solo per la categoria `veterinary` (3 servizi)

### ServiceDetail (`/service/:serviceId`)
- Header con logo struttura e pulsante preferiti (cuore)
- Lista dei servizi offerti con icona emoji e indicatore disponibilità
- Contatti (telefono, indirizzo, sito web) con link attivi
- Orari di apertura
- Pulsante "Ottieni indicazioni"

### Agenda (`/agenda`)
- Header scuro con calendario a 7 giorni scorrevole
- Pallini indicatori per i giorni con appuntamenti (24, 26, 28 Apr)
- Lista appuntamenti con data, ora e luogo
- Card promemoria vaccini
- **Modal "Aggiungi evento"**: tipo (appuntamento/reminder), titolo, data/ora, luogo, pet — il pulsante "Aggiungi al calendario" apre Google Calendar in una nuova tab

---

## Come vedere l'anteprima

### Prerequisiti
- Node.js installato (v18 o superiore)
- npm o pnpm

### Avvio

```bash
# Entra nella cartella del progetto
cd "Tailo App"

# Installa le dipendenze (solo la prima volta)
npm install --legacy-peer-deps
npm install react@18.3.1 react-dom@18.3.1 --force

# Avvia il server di sviluppo
npm run dev
```

Poi apri il browser su **http://localhost:5173**

> Il flag `--legacy-peer-deps` serve perché `react-leaflet@5` richiede React 19, ma il progetto usa React 18. Non impatta la funzionalità perché la mappa usa una implementazione custom.

### Build produzione

```bash
npm run build
```

---

## Stato funzionale

| Funzionalità | Stato |
|---|---|
| Navigazione tra pagine | ✅ Funzionante |
| Carosello pet (Home e Profilo) | ✅ Funzionante |
| Modalità editing profilo | ✅ Funzionante (UI, senza persistenza) |
| Toggle lista/mappa categorie | ✅ Funzionante |
| Mappa servizi custom | ✅ Funzionante (dati statici) |
| Modal agenda "Aggiungi evento" | ✅ Funzionante |
| Esportazione a Google Calendar | ✅ Funzionante |
| Preferiti (cuore) | ✅ Funzionante (stato locale) |
| Ricerca servizi | ⚠️ UI presente, non implementata |
| Persistenza dati (login, salvataggio) | ❌ Non implementata (dati statici) |
| Notifiche (campanella) | ❌ Non implementata |
| Cartella clinica | ❌ Non implementata |
