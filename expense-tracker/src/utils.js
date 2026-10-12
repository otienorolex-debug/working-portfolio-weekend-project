export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    const numericAmount = Number(amount);
    const sourceRate = Number(rates?.[fromCurrency]);
    const targetRate = Number(rates?.[toCurrency]);

    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
        throw new RangeError("Amount must be a non-negative finite number.");
    }
    if (!Number.isFinite(sourceRate) || sourceRate <= 0) {
        throw new RangeError(`Missing or invalid exchange rate for ${fromCurrency}.`);
    }
    if (!Number.isFinite(targetRate) || targetRate <= 0) {
        throw new RangeError(`Missing or invalid exchange rate for ${toCurrency}.`);
    }

    return (numericAmount / sourceRate) * targetRate;
}

export function calculateTotal(expenses, homeCurrency, rates) {
    return expenses.reduce((total, expense) => (
        total + convertCurrency(expense.amount, expense.currency, homeCurrency, rates)
    ), 0);
}

export function filterExpenses(expenses, category = "all") {
    return expenses.filter((expense) => category === "all" || expense.category === category);
}

export function formatCurrency(amount, currency) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
}
