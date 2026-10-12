import { fetchExchangeRates } from "./api.js";
import { addExpense, deleteExpense, loadExpenses, saveExpenses, CURRENCY_STORAGE_KEY } from "./state.js";
import { setRateStatus, renderExpenses } from "./ui.js";

const expenseForm = document.querySelector("#expense-form");
const expenseList = document.querySelector("#expense-list");
const homeCurrencySelect = document.querySelector("#home-currency");
const categoryFilter = document.querySelector("#category-filter");
const currencySelect = document.querySelector("#currency");
const retryRatesButton = document.querySelector("#retry-rates");
let expenses = [];
let exchangeRates = null;

function persistExpenses() {
    try {
        saveExpenses(expenses);
    } catch (error) {
        setRateStatus(`Could not save expenses in this browser: ${error.message}`, "error");
    }
}

function refreshExpenses() {
    renderExpenses(expenses, exchangeRates, homeCurrencySelect.value, categoryFilter.value);
}

async function refreshExchangeRates() {
    setRateStatus("Loading live exchange rates…");
    try {
        exchangeRates = await fetchExchangeRates();
        setRateStatus("Live exchange rates updated successfully.", "success");
    } catch (error) {
        const previousRatesMessage = exchangeRates
            ? " The last successfully loaded rates are still being used."
            : " Converted totals are unavailable until rates load.";
        setRateStatus(`${error.message}${previousRatesMessage}`, "error", true);
    }
    refreshExpenses();
}

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(expenseForm);
    const amount = Number(formData.get("amount"));
    if (!Number.isFinite(amount) || amount <= 0) {
        setRateStatus("Enter an amount greater than zero.", "error");
        return;
    }

    const category = String(formData.get("category"));
    const categoryLabel = expenseForm.elements.category.selectedOptions[0].textContent;
    const expense = {
        id: globalThis.crypto.randomUUID(),
        description: String(formData.get("description")).trim(),
        amount,
        currency: String(formData.get("currency")),
        category,
        categoryLabel,
    };
    expenses = addExpense(expenses, expense);
    persistExpenses();
    expenseForm.reset();
    currencySelect.value = expense.currency;
    refreshExpenses();
});

expenseList.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const deleteButton = event.target.closest('[data-action="delete"]');
    const item = deleteButton?.closest(".expense-item");
    if (!item) {
        return;
    }

    expenses = deleteExpense(expenses, item.dataset.expenseId);
    persistExpenses();
    refreshExpenses();
});

categoryFilter.addEventListener("change", refreshExpenses);

homeCurrencySelect.addEventListener("change", () => {
    try {
        localStorage.setItem(CURRENCY_STORAGE_KEY, homeCurrencySelect.value);
    } catch (error) {
        setRateStatus(`Could not save your home-currency preference: ${error.message}`, "error");
    }
    refreshExchangeRates();
});

retryRatesButton.addEventListener("click", refreshExchangeRates);

try {
    expenses = loadExpenses();
    homeCurrencySelect.value = localStorage.getItem(CURRENCY_STORAGE_KEY) || "USD";
} catch (error) {
    setRateStatus(`Could not restore saved data: ${error.message}`, "error");
}

refreshExpenses();
refreshExchangeRates();
