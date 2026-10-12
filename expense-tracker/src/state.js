export const EXPENSES_STORAGE_KEY = "expense-tracker-expenses";
export const CURRENCY_STORAGE_KEY = "expense-tracker-home-currency";

export function loadExpenses(storage = globalThis.localStorage) {
    const storedValue = storage.getItem(EXPENSES_STORAGE_KEY);
    if (!storedValue) {
        return [];
    }

    const expenses = JSON.parse(storedValue);
    if (!Array.isArray(expenses)) {
        throw new TypeError("Saved expense data is invalid.");
    }
    return expenses;
}

export function saveExpenses(expenses, storage = globalThis.localStorage) {
    storage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
}

export function addExpense(expenses, expense) {
    return [...expenses, expense];
}

export function updateExpense(expenses, expenseId, changes) {
    return expenses.map((expense) => (
        expense.id === expenseId ? { ...expense, ...changes } : expense
    ));
}

export function deleteExpense(expenses, expenseId) {
    return expenses.filter((expense) => expense.id !== expenseId);
}
