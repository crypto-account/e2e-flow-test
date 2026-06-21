# E2E Flow Test 🧪

Projekt zawiera **automatyczne testy end-to-end (E2E)** dla aplikacji webowej przy użyciu **Cypress** i **CircleCI**.

## 📋 Opis projektu

Ten repo automatyzuje testowanie aplikacji na trzech środowiskach:
- **DEV** — testy lokalnego środowiska deweloperskiego
- **PREPROD** — testy środowiska preproduksyjnego
- **PROD** — testy produkcji (wymagana ręczna akceptacja)

## 🏗️ Architektura CI/CD

```
┌─────────────────────────────────────────────────────────┐
│                    CircleCI Pipeline                     │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Push do branch != main                                 │
│           ↓                                              │
│  ┌──────────────────────┐                               │
│  │ Testy na DEV         │ (localhost:3000)              │
│  └──────────────────────┘                               │
│                                                           │
│  ─────────────────────────────────────────────           │
│                                                           │
│  Merge do main (push)                                   │
│           ↓                                              │
│  ┌──────────────────────────────────────┐               │
│  │ Testy na PREPROD                     │ (preprod URL) │
│  │ (http://preprod.twoja-apka.pl)       │               │
│  └──────────────────────────────────────┘               │
│           ↓                                              │
│  ┌──────────────────────────────────────┐               │
│  │ ⏸️  Manual Approval (hold)            │               │
│  │ (wymaga zatwierdzenia)                │               │
│  └──────────────────────────────────────┘               │
│           ↓                                              │
│  ┌──────────────────────────────────────┐               │
│  │ Testy na PROD                        │ (prod URL)    │
│  │ (http://www.twoja-apka.pl)           │               │
│  └──────────────────────────────────────┘               │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Setup i instalacja

### Wymagania
- Node.js (wersja zgodna z `package.json`)
- npm lub yarn
- Cypress (instaluje się automatycznie)

### Instalacja lokalna

```bash
# Klonowanie repo
git clone https://github.com/crypto-account/e2e-flow-test.git
cd e2e-flow-test

# Instalacja zależności
npm install

# Otwarcie Cypress UI
npm run test:open

# Uruchomienie testów headless
npm run test:run
```

## 🧪 Uruchomienie testów

### Lokalnie (DEV)
```bash
npm run start:dev &
npm run test:run
```

### Na PREPROD
```bash
npx cypress run --browser chrome --config baseUrl=http://preprod.twoja-apka.pl
```

### Na PROD
```bash
npx cypress run --browser chrome --config baseUrl=http://www.twoja-apka.pl
```

## 📁 Struktura projektu

```
e2e-flow-test/
├── .circleci/
│   └── config.yml              # Konfiguracja CircleCI pipeline
├── cypress/
│   ├── e2e/                    # Testy E2E
│   ├── support/                # Helpery i konfiguracja Cypress
│   ├── screenshots/            # Zrzuty ekranu (git-ignored)
│   └── videos/                 # Nagrania z testów (git-ignored)
├── .env                        # Zmienne środowiskowe (git-ignored)
├── .gitignore                  # Ignorowane pliki
├── cypress.config.js           # Konfiguracja Cypress
├── package.json                # Zależności projektu
└── README.md                   # Ten plik
```

## 🔧 Konfiguracja

### CircleCI konfiguracja (`.circleci/config.yml`)

| Środowisko | Trigger | URL | Wymaga akceptacji |
|-----------|---------|-----|------------------|
| **DEV** | Push do dowolnego brancha (nie main) | `localhost:3000` | ❌ |
| **PREPROD** | Push do `main` | `http://preprod.twoja-apka.pl` | ❌ |
| **PROD** | Po zatwierdzeniu PREPROD | `http://www.twoja-apka.pl` | ✅ |

### Zmienne środowiskowe

Utwórz plik `.env` w głównym katalogu:

```env
# DEV
DEV_URL=http://localhost:3000

# PREPROD
PREPROD_URL=http://preprod.twoja-apka.pl

# PROD
PROD_URL=http://www.twoja-apka.pl

# Opcjonalne
API_KEY=your_api_key
USERNAME=test_user
PASSWORD=test_password
```

## 📊 Monitorowanie testów

Wyniki testów są dostępne w:
- **CircleCI Dashboard** — artefakty, logi
- **Screenshoty** — `cypress/screenshots/`
- **Nagrania** — `cypress/videos/`

## ⚙️ NPM Scripts

Dodaj w `package.json`:

```json
{
  "scripts": {
    "start:dev": "your-dev-server-command",
    "test:open": "cypress open",
    "test:run": "cypress run --browser chrome",
    "test:preprod": "cypress run --browser chrome --config baseUrl=http://preprod.twoja-apka.pl",
    "test:prod": "cypress run --browser chrome --config baseUrl=http://www.twoja-apka.pl"
  }
}
```

## 🐛 Troubleshooting

### Cypress nie znajduje aplikacji
```bash
# Sprawdź, czy aplikacja biegnie na poprawnym porcie
npm run start:dev

# W innym terminu uruchom testy
npm run test:run
```

### Testy timeout
- Zwiększ timeout w `cypress.config.js`
- Sprawdź, czy aplikacja jest dostępna na podanym URL-u

### CircleCI build failure
1. Sprawdź logi w CircleCI Dashboard
2. Przejrzyj screenshoty w artefaktach
3. Sprawdź czy zmienne środowiskowe są ustawione

## 📚 Dokumentacja

- [Cypress Official Docs](https://docs.cypress.io/)
- [CircleCI Orbs](https://circleci.com/developer/orbs/orb/cypress-io/cypress)
- [CircleCI Workflows](https://circleci.com/docs/workflows/)

## 👥 Contributing

1. Utwórz nowy branch dla Twojej feature: `git checkout -b feature/my-test`
2. Dodaj testy w `cypress/e2e/`
3. Uruchom lokalne testy: `npm run test:run`
4. Push i utwórz Pull Request

## 📝 Notatki

- ✅ Testy na DEV uruchamiają się automatycznie na każdy push (oprócz main)
- ✅ Testy na PREPROD uruchamiają się tylko na main
- ✅ Testy na PROD wymagają ręcznej akceptacji
- ⚠️ Pamiętaj aby nie commitować wrażliwych danych (hasła, API keys)

## 📞 Wsparcie

W razie problemów:
1. Sprawdź CircleCI logi
2. Uruchom testy lokalnie: `npm run test:open`
3. Skontaktuj się z zespołem QA

---

**Last updated:** 2026-06-21  
**Maintained by:** crypto-account team
