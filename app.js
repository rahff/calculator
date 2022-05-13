import { Calculator } from "./entity.js";

const screenHtml = document.querySelector('.screen');
const keyboardHtml = document.querySelector('.keyboard');


const calculator = new Calculator(keyboardHtml, screenHtml);

calculator.main();