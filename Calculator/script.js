let d = document.getElementById("display"),
    ops = ["+", "-", "*", "/"];

function addValue(v) {
  let last = d.value.slice(-1);
  for (let i = 0; i < ops.length; i++) {
    if (v == ops[i]) {
      for (let j = 0; j < ops.length; j++) {
        if (last == ops[j]) return;
      }
    }
  }
  if (v == ".") {
    let parts = d.value.split(/[-+*/]/);
    if (parts[parts.length - 1].includes(".")) return;
  }
  d.value += v;
}

function clearDisplay() { d.value = ""; }
function delLast() { d.value = d.value.slice(0, -1); }
function calc() {
  try {
    if (d.value == "") return;
    d.value = new Function("return " + d.value)();
  } catch {
    d.value = "Error";
  }
}
