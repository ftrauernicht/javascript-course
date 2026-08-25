// Chapter 1 - core reference solution
//
// Performs one arithmetic operation on two numbers.
// Paste this into the browser console, then try e.g. calculate(3, "+", 4).
function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        console.warn("Cannot divide by zero.");
        return undefined;
      }
      return a / b;
    case "%":
      return a % b;
    case "**":
      return a ** b;
    default:
      console.warn(`Unknown operator: "${operator}"`);
      return undefined;
  }
}
