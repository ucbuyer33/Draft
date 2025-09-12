document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.buttons button');
  const ops = '+-*/';

  function clearDisplay() {
    display.value = '';
  }

  function deleteLast() {
    display.value = display.value.slice(0, -1);
  }

  function appendValue(v) {
    const last = display.value.slice(-1);

    if (ops.includes(v)) {
      if (display.value.length === 0) return;
      if (ops.includes(last)) {
        display.value = display.value.slice(0, -1) + v;
        return;
      }
    }

    if (v === '.') {
      if (last === '.') return;
      if (display.value.length === 0 || ops.includes(last)) {
        display.value += '0';
      }
    }

    display.value += v;
  }

  function calculate() {
    try {
      const expr = display.value.trim();
      if (expr === '' || ops.includes(expr.slice(-1))) {
        display.value = 'Error';
        return;
      }
      const result = eval(expr);
      display.value = Number.isFinite(result) ? String(result) : 'Error';
    } catch {
      display.value = 'Error';
    }
  }

  buttons.forEach((btn) => {
    if (btn.classList.contains('clear')) {
      btn.addEventListener('click', clearDisplay);
    } else if (btn.classList.contains('delLast')) {
      btn.addEventListener('click', deleteLast);
    } else if (btn.classList.contains('equals')) {
      btn.addEventListener('click', calculate);
    } else {
      btn.addEventListener('click', () => appendValue(btn.textContent.trim()));
    }
  });

  document.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k >= '0' && k <= '9') { appendValue(k); e.preventDefault(); return; }
    if (ops.includes(k)) { appendValue(k); e.preventDefault(); return; }
    if (k === '.') { appendValue('.'); e.preventDefault(); return; }
    if (k === 'Enter') { calculate(); e.preventDefault(); return; }
    if (k === 'Backspace') { deleteLast(); e.preventDefault(); return; }
    if (k === 'Escape') { clearDisplay(); e.preventDefault(); return; }
  });
});
