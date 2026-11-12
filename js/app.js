const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const keypad = document.querySelector("#keypad");

let current = "0";
let stored = null;
let operator = null;
let shouldReset = false;

const symbols = { "+": "+", "−": "-", "×": "*", "÷": "/" };

function render() {
  display.textContent = current;
  expression.textContent = stored !== null && operator ? `${stored} ${operator}` : "";
}

function inputDigit(value) {
  if (shouldReset) { current = value === "." ? "0." : value; shouldReset = false; }
  else if (value === ".") { if (!current.includes(".")) current += "."; }
  else current = current === "0" ? value : current.length < 14 ? current + value : current;
  render();
}

function calculate(a, op, b) {
  const x = Number(a), y = Number(b);
  switch (op) {
    case "+": return x + y;
    case "−": return x - y;
    case "×": return x * y;
    case "÷": return y === 0 ? null : x / y;
    default: return y;
  }
}

function format(value) {
  if (!Number.isFinite(value)) return "Error";
  return String(Number.parseFloat(value.toPrecision(12)));
}

function chooseOperator(nextOperator) {
  if (current === "Error") return;
  if (stored !== null && operator && !shouldReset) {
    const result = calculate(stored, operator, current);
    if (result === null) { current = "Error"; stored = null; operator = null; render(); return; }
    current = format(result);
    stored = current;
  } else stored = current;
  operator = nextOperator;
  shouldReset = true;
  render();
}

function equals() {
  if (stored === null || !operator || current === "Error") return;
  const left = stored, op = operator, right = current;
  const result = calculate(left, op, right);
  expression.textContent = `${left} ${op} ${right} =`;
  current = result === null ? "Cannot divide by zero" : format(result);
  stored = null; operator = null; shouldReset = true;
  render();
}

function clear() {
  current = "0"; stored = null; operator = null; shouldReset = false;
  render();
}

function removeLast() {
  if (shouldReset || current === "Error" || current === "Cannot divide by zero") { current = "0"; shouldReset = false; }
  else current = current.length > 1 ? current.slice(0, -1) : "0";
  render();
}

function percent() {
  if (current !== "Error") { current = format(Number(current) / 100); shouldReset = false; render(); }
}

function handleAction(action, value) {
  if (action === "clear") return clear();
  if (action === "delete") return removeLast();
  if (action === "equals") return equals();
  if (value === "%") return percent();
  if (["+", "−", "×", "÷"].includes(value)) return chooseOperator(value);
  if (/^\d$/.test(value) || value === ".") return inputDigit(value);
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  handleAction(button.dataset.action, button.dataset.value);
});

document.addEventListener("keydown", (event) => {
  const keyMap = { "*": "×", "/": "÷", "-": "−", "Enter": "equals", "=": "equals", "Escape": "clear", "Backspace": "delete", "%": "%" };
  const mapped = keyMap[event.key] || event.key;
  if (/^\d$/.test(mapped) || mapped === "." || ["+", "−", "×", "÷", "%"].includes(mapped) || ["equals", "clear", "delete"].includes(mapped)) {
    event.preventDefault();
    handleAction(["equals", "clear", "delete"].includes(mapped) ? mapped : null, mapped);
  }
});

render();