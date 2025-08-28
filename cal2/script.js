const display = document.getElementById('display');
document.querySelector('.clear').addEventListener('click', () => {
  document.getElementById('display').value = '';
});


function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function appendValue(value) {
  display.value += value;
}

function calculate() {
  try {
    display.value = eval(display.value) || '';
  } catch {
    display.value = 'Error';
  }
}
