# E2E Flow Test 🧪

Automatyczne testy end-to-end (E2E) dla aplikacji webowej przy użyciu **Cypress** i **CircleCI**.

## 📋 Środowiska

- **DEV** — localhost:3000 (każdy push)
- **PREPROD** — preprod URL (push do main)
- **PROD** — production URL (wymaga akceptacji)

## 🚀 Setup

```bash
git clone https://github.com/crypto-account/e2e-flow-test.git
cd e2e-flow-test
npm install
npm run test:open
```

## 🧪 Uruchomienie testów

```bash
npm run test:run                 # DEV
npm run test:preprod             # PREPROD
npm run test:prod                # PROD
```

## 📁 Struktura

```
e2e-flow-test/
├── .circleci/config.yml
├── cypress/
│   ├── e2e/
│   └── support/
├── cypress.config.js
├── package.json
└── README.md
```

## ⚙️ Scripts

```json
{
  "start:dev": "dev-server-command",
  "test:open": "cypress open",
  "test:run": "cypress run --browser chrome",
  "test:preprod": "cypress run --browser chrome --config baseUrl=http://preprod.twoja-apka.pl",
  "test:prod": "cypress run --browser chrome --config baseUrl=http://www.twoja-apka.pl"
}
```

## 📚 Linki

- [Cypress Docs](https://docs.cypress.io/)
- [CircleCI Workflows](https://circleci.com/docs/workflows/)
