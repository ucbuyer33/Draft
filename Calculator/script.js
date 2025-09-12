
(() => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.buttons button');

  const ops = ['+', '-', '*', '/'];
  const visMap = { '*': '×', '/': '÷', '-': '−', '+': '+' };
  const logicMap = { '×': '*', '÷': '/', '−': '-', '+': '+' };

  let expression = '';
  let shown = '';

  function render() {
    display.value = shown;
  }

  function addValue(v) {
    const last = expression.slice(-1);

    if (ops.includes(v) && ops.includes(last)) return;

    if (v === '.') {
      const parts = expression.split(/[-+*/]/);
      const current = parts[parts.length - 1];
      if (current.includes('.')) return;
      if (current === '') {
        expression += '0';
        shown += '0';
      }
    }

    expression += v;
    shown += visMap[v] || v;
    render();
  }

  function clearDisplay() {
    expression = '';
    shown = '';
    render();
  }

  function delLast() {
    if (!expression) return;
    expression = expression.slice(0, -1);
    shown = shown.slice(0, -1);
    render();
  }

  function calc() {
    if (!expression) return;

    const last = expression.slice(-1);
    if (ops.includes(last)) {
      expression = expression.slice(0, -1);
      shown = shown.slice(0, -1);
    }

    try {
      const result = Function('"use strict";return (' + expression + ')')();
      expression = String(result);
      shown = expression;
      render();
    } catch (e) {
      expression = '';
      shown = 'Error';
      render();
    }
  }

  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      if (type === 'digit') {
        addValue(btn.dataset.value);
      } else if (type === 'operator') {
        addValue(btn.dataset.value);
      } else if (type === 'action') {
        const action = btn.dataset.action;
        if (action === 'clear') clearDisplay();
        else if (action === 'del') delLast();
        else if (action === 'equals') calc();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    const k = e.key;

    if ((k >= '0' && k <= '9') || ops.includes(k) || k === '.') {
      e.preventDefault();
      addValue(k);
    } else if (k === 'Enter' || k === '=') {
      e.preventDefault();
      calc();
    } else if (k === 'Backspace') {
      e.preventDefault();
      delLast();
    } else if (k === 'Escape') {
      e.preventDefault();
      clearDisplay();
    }
  });
})();
