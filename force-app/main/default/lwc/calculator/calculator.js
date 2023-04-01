import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {

    @track stringToCalculate = '' //A string that holds the current value being entered into the calculator
    @track extraButtons = ['CE','C','backspace','='] // An array of strings that represents the labels of extra buttons in the calculator.
    @track placeHoldertext = 'Enter Calculation' //A string that represents the placeholder text in the calculator input field.
    
    /* An array of objects that represent the rows and buttons in the calculator. 
        Each object has a key property that identifies the row, and a buttons property that contains an array of strings that represent the buttons in that row.
    */
    @track buttonJson = [
        { key : 'row1', buttons : ['CE','C','/','backspace'] },
        { key : 'row2', buttons : ['7','8','9','*'] },
        { key : 'row3', buttons : ['4','5','6','-'] },
        { key : 'row4', buttons : ['1','2','3','+'] },
        { key : 'row5', buttons : ['00','0','.','='] }
    ]

    /* The get placeHolder method returns the placeholder text to be displayed in the input field.
        If placeHoldertext is truthy, it returns that value, otherwise it returns the stringToCalculate variable.
    */
    get placeHolder(){ return this.placeHoldertext ? this.placeHoldertext : this.stringToCalculate }

    /* The handleClick method is called when a calculator button is clicked. 
        It first gets the value of the button from the dataset.val property of the event target. 
        Depending on the value of val, it performs different operations:
    */
    handleClick(event){
        let val = event.target.dataset.val

        // removes the last character from stringToCalculate variable
        if(val === 'backspace' && !this.placeHoldertext.lenght > 0 ) this.stringToCalculate = this.removeLastCharacter(this.stringToCalculate)
        // it clears the stringToCalculate variable
        if(val === 'CE' || val === 'C') this.stringToCalculate = ''
        // it evaluates the current value of stringToCalculate using the eval function and sets stringToCalculate to the result.
        if(val === '=') this.stringToCalculate = eval(this.stringToCalculate).toString()
        // If val is not one of the extra buttons, it appends val to the stringToCalculate variable.
        if(!this.extraButtons.includes(val)) this.stringToCalculate += val
        // Finally, it updates the placeHoldertext variable based on whether stringToCalculate is empty or not
        this.placeHoldertext = this.stringToCalculate.length > 0 ? '' : 'Enter Calculation'
    }

    /*
        The removeLastCharacter method is a helper method that takes a string value and returns a new string with the last character removed. 
        It is called by handleClick when the backspace button is clicked.
    */
    removeLastCharacter(stringValue){ return stringValue.substring(0,stringValue.length - 1) }

}