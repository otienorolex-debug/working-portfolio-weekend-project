import test from "node:test";
import assert from "node:assert/strict";
import { calculateTotal, convertCurrency, filterExpenses } from "../src/utils.js";
import { updateExpense } from "../src/state.js";

const rates = { USD: 1, EUR: 0.9, GBP: 0.8, KES: 130 };
const expenses = [
    { amount: 10, currency: "USD", category: "food" },
    { amount: 9, currency: "EUR", category: "transportation" },
    { amount: 5, currency: "USD", category: "food" },
];

test("converts an amount between currencies using USD-based rates", () => {
    assert.equal(convertCurrency(10, "USD", "KES", rates), 1300);
});

test("converts zero without introducing a non-zero result", () => {
    assert.equal(convertCurrency(0, "EUR", "GBP", rates), 0);
});

test("reports a missing exchange rate instead of silently using a wrong value", () => {
    assert.throws(() => convertCurrency(10, "CAD", "USD", rates), /Missing or invalid exchange rate for CAD/);
});

test("calculates the total in the selected home currency", () => {
    assert.equal(calculateTotal(expenses, "USD", rates), 25);
    assert.equal(calculateTotal([], "USD", rates), 0);
});

test("filters expenses by category and returns all for the all option", () => {
    assert.equal(filterExpenses(expenses, "food").length, 2);
    assert.equal(filterExpenses(expenses, "all").length, 3);
});

test("updates an expense immutably without changing the original array or object", () => {
    const original = [{ id: "a", amount: 10, category: "food" }];
    const updated = updateExpense(original, "a", { category: "shopping" });

    assert.deepEqual(updated, [{ id: "a", amount: 10, category: "shopping" }]);
    assert.notEqual(updated, original);
    assert.notEqual(updated[0], original[0]);
    assert.equal(original[0].category, "food");
});
