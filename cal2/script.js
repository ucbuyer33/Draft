var display = document.getElementById('display');
var buttons = document.querySelectorAll('.buttons button');
var operators = ['+', '-', '*', '/'];

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    var currentValue = display.value;
    var newValue = '';
    
    for (var i = 0; i < currentValue.length - 1; i++) {
        newValue += currentValue[i];
    }
    
    display.value = newValue;
}

function appendValue(value) {
    var currentDisplay = display.value;
    var lastChar = '';
    
    if (currentDisplay.length > 0) {
        lastChar = currentDisplay[currentDisplay.length - 1];
    }
    
    var isOperator = false;
    for (var i = 0; i < operators.length; i++) {
        if (value === operators[i]) {
            isOperator = true;
            break;
        }
    }
    
    if (isOperator) {
        if (currentDisplay.length === 0) {
            return;
        }
        
        var lastIsOperator = false;
        for (var j = 0; j < operators.length; j++) {
            if (lastChar === operators[j]) {
                lastIsOperator = true;
                break;
            }
        }
        
        if (lastIsOperator) {
            var newDisplay = '';
            for (var k = 0; k < currentDisplay.length - 1; k++) {
                newDisplay += currentDisplay[k];
            }
            display.value = newDisplay + value;
            return;
        }
    } else if (value === '.') {
        if (lastChar === '.') {
            return;
        }
        
        if (currentDisplay.length === 0) {
            display.value += '0';
        } else {
            var needsZero = false;
            for (var m = 0; m < operators.length; m++) {
                if (lastChar === operators[m]) {
                    needsZero = true;
                    break;
                }
            }
            if (needsZero) {
                display.value += '0';
            }
        }
    }
    
    display.value += value;
}

function calculate() {
    var expression = display.value;
    
    var cleanExpression = '';
    for (var i = 0; i < expression.length; i++) {
        if (expression[i] !== ' ') {
            cleanExpression += expression[i];
        }
    }
    
    if (cleanExpression.length === 0) {
        display.value = 'Error';
        return;
    }
    
    var lastChar = cleanExpression[cleanExpression.length - 1];
    var endsWithOperator = false;
    for (var i = 0; i < operators.length; i++) {
        if (lastChar === operators[i]) {
            endsWithOperator = true;
            break;
        }
    }
    
    if (endsWithOperator) {
        display.value = 'Error';
        return;
    }
    
    try {
        var result = eval(cleanExpression);
        
        if (isFinite(result) && !isNaN(result)) {
            display.value = result.toString();
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    
    if (button.classList.contains('clear')) {
        button.addEventListener('click', clearDisplay);
    } else if (button.classList.contains('delLast')) {
        button.addEventListener('click', deleteLast);
    } else if (button.classList.contains('equals')) {
        button.addEventListener('click', calculate);
    } else {
        button.addEventListener('click', function() {
            var buttonValue = this.textContent;
            
            var cleanValue = '';
            for (var j = 0; j < buttonValue.length; j++) {
                if (buttonValue[j] !== ' ') {
                    cleanValue += buttonValue[j];
                }
            }
            
            appendValue(cleanValue);
        });
    }
}

document.addEventListener('keydown', function(event) {
    var key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendValue(key);
        event.preventDefault();
    } else if (key === '+') {
        appendValue('+');
        event.preventDefault();
    } else if (key === '-') {
        appendValue('-');
        event.preventDefault();
    } else if (key === '*') {
        appendValue('*');
        event.preventDefault();
    } else if (key === '/') {
        appendValue('/');
        event.preventDefault();
    } else if (key === '.') {
        appendValue('.');
        event.preventDefault();
    } else if (key === 'Enter') {
        calculate();
        event.preventDefault();
    } else if (key === 'Backspace') {
        deleteLast();
        event.preventDefault();
    } else if (key === 'Escape') {
        clearDisplay();
        event.preventDefault();
    }
});
