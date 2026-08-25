// Chapter 1 - Calculator GUI
//
// A small, pure calculation function - same three inputs always produce
// the same result, and it never touches the page. See it introduced and
// tested on its own in the "calculation engine" section of the chapter.
function calculate(a, operator, b) {
  if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  } else if (operator === "*") {
    return a * b;
  } else if (operator === "/") {
    if (b === 0) {
      console.warn("Cannot divide by zero.");
      return NaN;
    }
    return a / b;
  } else {
    console.warn("Unknown operator: " + operator);
    return NaN;
  }
}

class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.currentValue = "0";
    this.previousValue = null;
    this.operator = null;
    this.shouldResetDisplay = false;
  }

  inputDigit(digit) {
    if (this.shouldResetDisplay) {
      this.currentValue = "0";
      this.shouldResetDisplay = false;
    }

    if (digit === "." && this.currentValue.includes(".")) {
      return; // already has a decimal point, ignore
    }

    this.currentValue =
      this.currentValue === "0" && digit !== "."
        ? digit
        : this.currentValue + digit;

    this.updateDisplay();
  }

  chooseOperator(operator) {
    if (this.operator !== null && !this.shouldResetDisplay) {
      this.equals();
    }

    this.previousValue = this.currentValue;
    this.operator = operator;
    this.shouldResetDisplay = true;
  }

  equals() {
    if (this.operator === null || this.previousValue === null) {
      return;
    }

    const result = calculate(
      Number(this.previousValue),
      this.operator,
      Number(this.currentValue)
    );

    this.currentValue = String(result);
    this.operator = null;
    this.previousValue = null;
    this.shouldResetDisplay = true;

    this.updateDisplay();
  }

  clear() {
    this.currentValue = "0";
    this.previousValue = null;
    this.operator = null;
    this.shouldResetDisplay = false;
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentValue;
  }
}

const display = document.getElementById("display");
const calculator = new Calculator(display);

document.querySelectorAll("[data-digit]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.inputDigit(button.dataset.digit);
  });
});

document.querySelectorAll("[data-operator]").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.dataset.operator);
  });
});

document
  .querySelector('[data-action="equals"]')
  .addEventListener("click", () => calculator.equals());

document
  .querySelector('[data-action="clear"]')
  .addEventListener("click", () => calculator.clear());
