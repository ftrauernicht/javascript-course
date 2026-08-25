const STORAGE_KEY = "budget-tracker-entries";

const balanceText = document.getElementById("balance");
const entryForm = document.getElementById("entry-form");
const descriptionInput = document.getElementById("description-input");
const amountInput = document.getElementById("amount-input");
const typeInput = document.getElementById("type-input");
const categoryInput = document.getElementById("category-input");
const entryList = document.getElementById("entry-list");
const chart = document.getElementById("chart");

let entries = loadEntries();

function loadEntries() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function formatAmount(amount) {
  return "$" + amount.toFixed(2);
}

function calculateBalance() {
  return entries.reduce((total, entry) => {
    if (entry.type === "income") {
      return total + entry.amount;
    }
    return total - entry.amount;
  }, 0);
}

function calculateCategoryTotals() {
  const expenses = entries.filter((entry) => entry.type === "expense");
  const totals = {};

  expenses.forEach((entry) => {
    totals[entry.category] = (totals[entry.category] || 0) + entry.amount;
  });

  return totals;
}

function renderBalance() {
  balanceText.textContent = formatAmount(calculateBalance());
}

function renderEntries() {
  entryList.innerHTML = entries
    .map((entry, index) => {
      const sign = entry.type === "income" ? "+" : "-";
      const amountClass = entry.type === "income" ? "amount income" : "amount expense";
      return (
        '<li class="entry">' +
          '<span class="description">' + entry.description + " (" + entry.category + ")</span>" +
          '<span class="' + amountClass + '">' + sign + formatAmount(entry.amount) + "</span>" +
          '<button class="remove" data-index="' + index + '">&times;</button>' +
        "</li>"
      );
    })
    .join("");

  entryList.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      entries.splice(index, 1);
      saveEntries();
      renderAll();
    });
  });
}

function renderChart() {
  const totals = calculateCategoryTotals();
  const categories = Object.keys(totals);

  if (categories.length === 0) {
    chart.innerHTML = "<p>No expenses yet.</p>";
    return;
  }

  const highest = categories.reduce((max, category) => {
    return totals[category] > max ? totals[category] : max;
  }, 0);

  chart.innerHTML = categories
    .map((category) => {
      const amount = totals[category];
      const percent = Math.round((amount / highest) * 100);
      return (
        '<div class="bar-row">' +
          '<span class="bar-label">' + category + "</span>" +
          '<div class="bar-track"><div class="bar-fill" style="width: ' + percent + '%"></div></div>' +
          '<span class="bar-amount">' + formatAmount(amount) + "</span>" +
        "</div>"
      );
    })
    .join("");
}

function renderAll() {
  renderBalance();
  renderEntries();
  renderChart();
}

function handleAddEntry(event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);

  if (description === "" || !(amount > 0)) {
    return;
  }

  entries.push({
    description: description,
    amount: amount,
    type: typeInput.value,
    category: categoryInput.value,
  });

  descriptionInput.value = "";
  amountInput.value = "";

  saveEntries();
  renderAll();
}

entryForm.addEventListener("submit", handleAddEntry);

renderAll();
