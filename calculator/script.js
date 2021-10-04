class Calculator {
  constructor(previousOpElement, currentOpElement) {
    this.previousOpElement = previousOpElement;
    this.currentOpElement = currentOpElement;
    this.MAX_DIGITS = 12;
    this.clearAll();
  }

  // Clear all calculations function
  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.currentResult = undefined;
    this.operation = undefined;
    this.displayingResult = false;
    this.isFirstCalculation = true;
  }

  // Remove last character from current operand
  clear() {
    if (
      this.currentOperand === undefined ||
      this.currentOperand === this.currentResult
    ) {
      return;
    }
    this.currentOperand = this.currentOperand.slice(0, -1);

    // Set to "0" when user clears all character from display
    if (this.currentOperand === "") {
      this.currentOperand = "0";
    }
  }

  appendNumber(inputNumber) {
    if (this.previousOperand.includes("=")) {
      return;
    }
    // Reset after first calculation
    if(this.displayingResult) {
      this.currentOperand = "";
      this.displayingResult = false;
    }

    // Prevents user from entering additional decimals
    if(inputNumber === '.' && this.currentOperand.includes(".")) {
      return;
    }

    // Prevents user from entering multiple 0s
    if (this.currentOperand === "0") {
      this.currentOperand = "";
    }

    // Add 0 before a number starting with a decimal
    if (inputNumber === '.' && this.currentOperand === "") {
      this.currentOperand = "0.";
    } else {
      if (this.currentOperand.length > 0) {
        let numberPattern = /\d+/g;
        let digits = this.currentOperand.match(numberPattern).join("");
        if(digits.length < this.MAX_DIGITS) {
          this.currentOperand += inputNumber;
        }
      } else {
        this.currentOperand += inputNumber;
      }
    }
  }

  selectOperation(operation) {
    if (this.currentOperand && !this.displayingResult) {
      if (operation === "=" && this.previousOperand === "") {
        return;
      } else if (this.previousOperand.includes("=")) {
        return;
      }

      if (this.currentOperand.slice(-1) === ".") {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateDisplay();
      }

      // Calculate the result and appends to previous operand history
      this.calculate();
      this.operation = operation;
      this.previousOperand += `${this.currentOpElement.innerText} ${operation}`;

      // Clear current operand display the first time an operation is selected
      if (this.isFirstCalculation) {
        this.currentOperand = "";
        this.isFirstCalculation = false;
      } else {
        this.currentOperand = this.currentResult.toString();
        this.displayingResult = true;
      }
    } else {
      // Reset after the equals operation is selected
      if (this.displayingResult) {
        if (operation !== "=" && this.previousOperand.includes("=")) {
          this.previousOperand = "";
          this.calculate();
          this.operation = operation;
          this.previousOperand += `${this.currentOpElement.innerText} ${operation}`;
          this.currentOperand = "";
          this.updateDisplay();
        }
      }
    }
  }

  reverseSign() {
    if (parseFloat(this.currentOperand) > 0) {
      this.currentOperand = parseFloat(this.currentOperand) * -1;
      this.currentOperand = this.currentOperand.toString();
    } else if (this.currentOperand.includes("-")) {
      this.currentOperand = this.currentOperand.substring(1);
    }
  }

  calculate() {
    if (this.currentResult === undefined) {
      this.currentResult = parseFloat(this.currentOperand);
    } else {
      let currentCalculation = parseFloat(this.currentOperand);
      switch(this.operation) {
        case "+":
          this.currentResult = this.currentResult + currentCalculation;
          break;
        case "-":
          this.currentResult = this.currentResult - currentCalculation;
          break;
        case "x":
          this.currentResult = this.currentResult * currentCalculation;
          break;
        case "÷":
          if (currentCalculation === 0) {
            this.currentResult = "NaN";
          }
          this.currentResult = this.currentResult / currentCalculation;
          break;
        default:
          return;
      }
    }
  }

  formatDisplay(number) {
    const stringNumber = number.toString();
    // Split the current operand into 2 strings at the decimal point
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    // Check for zero division
    if(isNaN(integerDigits) && this.currentResult !== "NaN") {
      integerDisplay = "";
    } else {
      // Comma seperated format for inteer digits only
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    // Check for decimal numbers
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOpElement.innerText = this.formatDisplay(this.currentOperand);
    this.previousOpElement.innerText = this.previousOperand;
  };
}

const keyboardControls = (e) => {
  const KEYS = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "-", "*", "x", "X", "/", "=", "Enter", "Backspace", "Delete",
  ];
  const key = e.key;
  if(!KEYS.includes(e.key)) {
    return;
  } else {
    switch(key) {
      case "Backspace":
        calc.clear();
        calc.updateDisplay();
        break;
      case "Delete":
        calc.clearAll();
        calc.updateDisplay();
        break;
      case "Enter":
      case "=":
        e.preventDefault();
        calc.selectOperation("=");
        calc.updateDisplay();
        break;
      case "/": 
        calc.selectOperation("÷");
        calc.updateDisplay();
        break;
      case "*":
      case "x":
      case "X":
        calc.selectOperation("x");
        calc.updateDisplay();
        break;
      case "+":
        calc.selectOperation("+");
        calc.updateDisplay();
        break;
      case "-":
        calc.selectOperation("-");
        calc.updateDisplay();
        break;
      default:
        calc.appendNumber(e.key);
        calc.updateDisplay();
    }
  }
};

// UI components
const previousOperand = document.getElementById("lastOperationScreen")
const currentOperand = document.getElementById("currentOperationScreen")
const clearAllBtn = document.getElementById("AC");
const clearLastBtn = document.querySelector("[data-clear-last]");
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const plusMinusBtn = document.querySelector("[data-negative-positive]");

const calc = new Calculator(previousOperand, currentOperand);

numberBtns.forEach( button => {
  button.addEventListener('click', () => {
    calc.appendNumber(button.innerText);
    calc.updateDisplay();
  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    calc.selectOperation(button.innerText);
    calc.updateDisplay();
  });
});

clearAllBtn.addEventListener("click", () => {
  calc.clearAll();
  calc.updateDisplay();
});

clearLastBtn.addEventListener('click', () => {
  calc.clear();
  calc.updateDisplay();
});

plusMinusBtn.addEventListener("click", () => {
  calc.reverseSign();
  calc.updateDisplay();
});

document.addEventListener("keydown", keyboardControls);