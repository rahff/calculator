class Screen {
    view
    constructor(html){
        this.view = html;
    }

    displayNumber(number){
        const numberContainer = document.createElement('span');
        numberContainer.innerText = number;
        this.view.appendChild(numberContainer);
        console.log(this.view);
    }

    displayOperator(operator){
        const operatorContainer = document.createElement('span');
        operatorContainer.innerText = operator;
        this.view.appendChild(operatorContainer);
        console.log(this.view);
    }
}

class Keyboard {
    numericBtns;
    component
    constructor(html){
        this.component = html
        this.init()
    }

    init(){
       this.numericBtns = this.component.querySelectorAll('button');
    }
   
}

class Processor {
    numberMemory = []
    operatorMemory = []
    constructor(){
        console.log("processor");
    }

    addNumberInMemory(number){
        this.numberMemory.push(number);
    }

    addOperatorInMemory(operator){
        this.operatorMemory.push(operator);
    }

    caculate(){
        return eval(`${this.numberMemory[0]}${this.operatorMemory}${this.numberMemory[1]}`)
    }
}

export class Calculator {
    processor;
    keyboard;
    screen;
    numericBtns
    interruptor = true;
    numberInView = null;
    currentOperators = null;

    constructor(keybordHtml, screenHtml){
        this.keyboard = new Keyboard(keybordHtml);
        this.screen = new Screen(screenHtml);
        this.processor = new Processor();
    }
    main(){
        this.keyboard.init();
        this.numericBtns = this.keyboard.numericBtns
        this.numericBtns.forEach(element => {
            switch (element.className) {
                case "numeric":
                    element.addEventListener('click', this.onClickNumericBtn.bind(this));
                    break;
                    case "operator":
                        element.addEventListener('click', this.onClickOperatorBtn.bind(this));    
                    break;
                    case "enter":
                        element.addEventListener('click', this.onClickEnterBtn.bind(this));    
                    break;
                default: return;
            }
        });
    }
    onClickNumericBtn(event){
        console.log(event);
        this.numberInView = event.target.dataset.numeric;
        this.processor.addNumberInMemory(this.numberInView);
        this.screen.displayNumber(this.numberInView);
    }

    onClickOperatorBtn(event){
        this.lastOperator = event.target.dataset.operator;
        this.processor.addOperatorInMemory(this.lastOperator);
        this.screen.displayOperator(this.lastOperator);
    }

    onClickEnterBtn(event){
        this.screen.displayNumber(` = ${this.processor.caculate()}`);
    }
}
