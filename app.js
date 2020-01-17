// pobieram przyciski
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const numberButtons = document.querySelectorAll('[data-number]');
const signButtons = document.querySelectorAll('[data-sign]');
const equalsButton = document.querySelector('[data-equals]');
// pobieram "wyświetlacz kalkulatora"
const divOutput = document.querySelector('[data-output]');
// definiuję zmienne, w których będę przechowywał wprowadzone liczby

let memoryFirstNumber = 0;
let memorySign = 0;
let memorySecondNumber = 0;

// tworzę funkcję wyświetlającą wynik działania
function printOperation(num) {
    divOutput.innerText = num;
}
// tworzę funkcję wykonującą obliczenia zgodnie z wprowadzonym znakiem
function equalsFunction() {
    switch (memorySign) {
        case "+":
            memoryFirstNumber = parseFloat(memoryFirstNumber) + parseFloat(memorySecondNumber);
            break
        case "-":
            memoryFirstNumber = parseFloat(memoryFirstNumber) - parseFloat(memorySecondNumber);
            break
        case "*":
            memoryFirstNumber = parseFloat(memoryFirstNumber) * parseFloat(memorySecondNumber);
            break
        case "/":
            memoryFirstNumber = parseFloat(memoryFirstNumber) / parseFloat(memorySecondNumber);
            break
        default:
            return
    }
    // zaokrąglam wynik do 2 miejsc po przecinku. Nie było to zdefiniowane ale zabezpiecza poprawne wyświetlanie
    printOperation(memoryFirstNumber.toFixed(2));
    memorySign = 0;
    memorySecondNumber = 0;
}
// definiuję wprowadzanie wartości z klawiatury ekranowej
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (memorySign == "") {
            if (memoryFirstNumber == 0) {
                memoryFirstNumber = button.textContent;
            } else {
                memoryFirstNumber = memoryFirstNumber.toString() + button.textContent;
            }

            printOperation(memoryFirstNumber);
        } else {
            if (memorySecondNumber == 0) {
                memorySecondNumber = button.textContent;
            } else {
                memorySecondNumber = memorySecondNumber.toString() + button.textContent;
            }

            printOperation(memorySecondNumber);

        }
    })
});
// definiuję obsługę przycisków ze znakami działań
signButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (memorySign != 0) {
            equalsFunction();
        }
        memorySign = button.textContent;


        printOperation(memorySign);
    })
});

// definiuję obsługę przycisku zwracającego wynik
equalsButton.addEventListener("click", equalsFunction);


// definiuję czyszczenie "pamięci" kalkulatora
clearButton.addEventListener("click", () => {
    memoryFirstNumber = 0;
    memorySign = 0;
    memorySecondNumber = 0;
    printOperation("");
})
// definiuję kasowanie znaków
deleteButton.addEventListener("click", () => {
    // definiuję, który element ma być kasowany
    if (memorySign == 0) {
        memoryFirstNumber = 0;
        printOperation("");
    } else if (memorySign != 0 && memorySecondNumber == 0) {
        memorySign = 0;
        printOperation(memoryFirstNumber);
    } else if (memorySecondNumber != 0) {
        memorySecondNumber = 0;
        printOperation(memorySign);
    }

});