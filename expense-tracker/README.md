# Expense Tracker with Live Currency Conversion

A small browser-based expense tracker for travellers, freelancers, and shoppers who pay in multiple currencies. Add purchases in their original currencies and see each one and the running total converted into a selected home currency using live rates from the no-key-required [Open ER API](https://open.er-api.com/v6/latest/USD). Expenses and the home-currency preference are kept in this browser's local storage; there is no account or cloud synchronization.

## Live demo

[Open the GitHub Pages demo](https://otienorolex-debug.github.io/working-portfolio-weekend-project/). The link becomes live after the Pages workflow deploys successfully and GitHub Pages is enabled with **GitHub Actions** as its build source in the repository settings.

## Features

- Add an expense description, positive amount, paid currency, and category.
- Display original and converted amounts and a running total in the selected home currency.
- Filter the list by category and delete individual expenses.
- Load live USD-based exchange rates at startup and again when the home currency changes.
- Show loading, success, and error states; retry a failed rates request.
- Keep expenses and the selected home currency in browser local storage.
- Responsive layout suitable for desktop and mobile.

## Technology

- HTML and CSS
- JavaScript ES modules (`api.js`, `state.js`, `utils.js`, `ui.js`, `main.js`)
- REST API: [Open ER API](https://open.er-api.com/v6/latest/USD)
- Unit tests: Node.js built-in test runner
- Static analysis: ESLint
- Deployment: GitHub Pages through GitHub Actions

## Run locally

From this directory, serve the static files over HTTP (ES modules do not work reliably from a `file://` URL):

```sh
npm install
npx serve .
```

Open the local URL printed by `serve`. To run the unit tests and lint:

```sh
npm test
npm run lint
```

## What I would improve with more time

- Add editable expenses and date-based summaries.
- Add an optional export/import flow for expense data.
- Cache the last successful rates with a timestamp and show their age when offline.
- Add browser-level end-to-end tests for the form and filtering interactions.

## Deployment

The repository workflow at `.github/workflows/pages.yml` publishes this directory when changes are pushed to `main`. In GitHub, enable Pages with **GitHub Actions** as the source, then check the workflow run and the Pages URL in repository settings. The API is fetched directly by the browser and requires no API key or backend.
