"use strict";

// Чиста функція: перевіряє значення та повертає суму покупки.
function calculateTotal(quantity, price) {
    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error("Введіть цілу кількість від 1.");
    }
    if (!Number.isFinite(price) || price < 0) {
        throw new Error("Введіть ціну не менше 0.");
    }
    const total = quantity * price;
    if (!Number.isFinite(total) || total > Number.MAX_SAFE_INTEGER / 100) {
        throw new Error("Значення завеликі. Зменште кількість або ціну.");
    }
    return Math.round(total * 100) / 100;
}

if (typeof document !== "undefined") {
    const form = document.querySelector("#sales-calculator");
    const result = document.querySelector("#calculation-result");
    const currency = new Intl.NumberFormat("uk-UA", {
        style: "currency", currency: "UAH"
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        try {
            const quantity = Number(form.elements.quantity.value);
            const price = Number(form.elements.price.value);
            result.textContent = "Вартість покупки: " + currency.format(calculateTotal(quantity, price));
        } catch (error) {
            result.textContent = error.message;
        }
    });
}

if (typeof module !== "undefined") {
    module.exports = { calculateTotal };
}
