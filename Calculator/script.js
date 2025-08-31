let display = document.getElementById("display"),
    ops = ["+", "-", "*", "/"],
    expression = "";  // internal JS expression for logic

const visMap = { "*": "×", "/": "÷", "-": "−", "+": "+" };
const logicMap = { "×": "*", "÷": "/", "−": "-", "+": "+" };

function addValue(v) {
  let last = expression.slice(-1);

  // Prevent two operators in a row
  if (ops.includes(v) && ops.includes(last)) return;

  // Prevent multiple decimals in a single number
  if (v === ".") {
    let parts = expression.split(/[-+*/]/);
    if (parts[parts.length - 1].includes(".")) return;
  }

  expression += v;
  display.value += visMap[v] || v;  // Show pretty symbol
}

function clearDisplay() {
  expression = "";
  display.value = "";
}

function delLast() {
  expression = expression.slice(0, -1);
  display.value = display.value.slice(0, -1);
}

function calc() {
  try {
    if (expression === "") return;

    // Evaluate the internal logic string
    const result = new Function("return " + expression)();

    // Reset everything to show result
    expression = result.toString();
    display.value = expression;
  } catch {
    expression = "";
    display.value = "Error";
  }
}
