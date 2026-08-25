// Chapter 1 - optional bonus reference solution
//
// Evaluates a math expression given as a string, including parentheses and
// normal operator precedence, e.g.:
//   evaluateExpression("(3 + 4) * 2") -> 14
//
// This is a small recursive-descent parser. It works in two steps:
//   1. Tokenize: turn the string into a flat list of numbers/operators/parens.
//   2. Parse: read the tokens respecting parentheses and precedence
//      (* and / bind tighter than + and -), evaluating as it goes.

function tokenize(expression) {
  const tokens = [];
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    if (char === " ") {
      i++;
      continue;
    }

    if ("()+-*/".includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }

    if (/[0-9.]/.test(char)) {
      let number = "";
      while (i < expression.length && /[0-9.]/.test(expression[i])) {
        number += expression[i];
        i++;
      }
      tokens.push(number);
      continue;
    }

    throw new Error(`Unexpected character: "${char}"`);
  }

  return tokens;
}

function evaluateExpression(expression) {
  const tokens = tokenize(expression);
  let position = 0;

  function peek() {
    return tokens[position];
  }

  function consume() {
    return tokens[position++];
  }

  // The smallest unit: a plain number, or a fully parenthesized expression.
  function parseFactor() {
    const token = consume();
    if (token === "(") {
      const value = parseExpression();
      consume(); // discard the matching ")"
      return value;
    }
    return Number(token);
  }

  // One level up: handles * and /, which bind tighter than + and -.
  function parseTerm() {
    let value = parseFactor();
    while (peek() === "*" || peek() === "/") {
      const operator = consume();
      const next = parseFactor();
      value = operator === "*" ? value * next : value / next;
    }
    return value;
  }

  // The top level: handles + and -.
  function parseExpression() {
    let value = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const operator = consume();
      const next = parseTerm();
      value = operator === "+" ? value + next : value - next;
    }
    return value;
  }

  return parseExpression();
}
