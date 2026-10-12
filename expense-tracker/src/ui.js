import { calculateTotal, convertCurrency, filterExpenses, formatCurrency } from "./utils.js";

const expenseList = document.querySelector("#expense-list");
const emptyState = document.querySelector("#expenses-empty-state");
const totalDisplay = document.querySelector("#expense-total");
const rateStatus = document.querySelector("#rate-status");
const expenseTemplate = document.querySelector("#expense-item-template");
const retryRatesButton = document.querySelector("#retry-rates");

export function setRateStatus(message, kind = "info", retryRates = false) {
    rateStatus.textContent = message;
    rateStatus.dataset.kind = kind;
    retryRatesButton.hidden = !retryRates;
}

export function renderExpenses(expenses, rates, homeCurrency, category) {
    const visibleExpenses = filterExpenses(expenses, category);
    expenseList.replaceChildren();

    for (const expense of visibleExpenses) {
        const item = expenseTemplate.content.firstElementChild.cloneNode(true);
        item.dataset.expenseId = String(expense.id);
        item.querySelector('[data-field="description"]').textContent = expense.description;
        item.querySelector('[data-field="category"]').textContent = expense.categoryLabel;
        item.querySelector('[data-field="original-amount"]').textContent =
            formatCurrency(Number(expense.amount), expense.currency);
        item.querySelector('[data-field="converted-amount"]').textContent = rates
            ? formatCurrency(convertCurrency(
                expense.amount,
                expense.currency,
                homeCurrency,
                rates,
            ), homeCurrency)
            : "Unavailable until rates load";
        expenseList.append(item);
    }

    emptyState.hidden = visibleExpenses.length > 0;
    emptyState.textContent = expenses.length > 0
        ? "No expenses match this category."
        : "No expenses yet. Add one above to get started.";

    totalDisplay.textContent = rates
        ? `Total shown: ${formatCurrency(calculateTotal(visibleExpenses, homeCurrency, rates), homeCurrency)}`
        : "Total unavailable until live exchange rates load.";
}
