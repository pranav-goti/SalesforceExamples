import { LightningElement, track, api } from 'lwc';

export default class LightningRestrictedPasswordField extends LightningElement {
    @track show = false
    @track curruntPassword =''
    @api validationResults

    get displyResult() {
        return this.validationResults != null ? Object.entries(this.validationResults).map(([key,value])=>({ key, value })) : []
    }

    get customClass(){
        return !this.show ? 'showPassword' : 'hidePassword'
    }

    showPassword(){
        this.show = !this.show
    }

    containsUppercase(password){
        return /[A-Z]/.test(password);
    }

    containsSpecialChars(password) {
        let spCharExpression = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return spCharExpression.test(password);
    }

    containsNumbers(password) {
        return /\d/.test(password);
    }

    setList(key,array, className, iconName, iconSize, alternativeText, title, isValid){
        array[key].className = className
        array[key].iconName = iconName
        array[key].iconSize = iconSize
        array[key].alternativeText = alternativeText
        array[key].title = title
        array[key].isValid = isValid
        return array
    }

    validatePassword(event){
        let password = event.detail.value
        this.curruntPassword = password
        let tempResult = JSON.parse(JSON.stringify(this.validationResults))

        // upper case
        if(this.containsUppercase(password)){
            tempResult = this.setList('isUpper', tempResult, 'success align-items' , 
                'utility:success' , 'xx-small', 'sucees', 'At-least one Character', true)            
        }else{
            tempResult = this.setList('isUpper', tempResult, 'error align-items' , 
                'utility:close' , 'xx-small', 'error', 'At-least one Character', false)
        }

        // special character
        if(this.containsSpecialChars(password)){
            tempResult = this.setList('isSpecial', tempResult, 'success align-items' , 
                'utility:success' , 'xx-small', 'sucees', 'At-least one Character', true)   
        }else{
            tempResult = this.setList('isSpecial', tempResult, 'error align-items' , 
                'utility:close' , 'xx-small', 'error', 'At-least one Special Character', false)
        }
;
        // number
        if(this.containsNumbers(password)){
            tempResult = this.setList('isNumber', tempResult, 'success align-items' , 
                'utility:success' , 'xx-small', 'sucees', 'At-least one Numbers' , true)   
        }else{
            tempResult = this.setList('isNumber', tempResult, 'error align-items' , 
                'utility:close' , 'xx-small', 'error', 'At-least one Numbers', false)
        }

        // more than 8 characters
        if(password.length > 8){
            tempResult = this.setList('isLength', tempResult, 'success align-items' , 
                'utility:success' , 'xx-small', 'sucees', 'more than 8 characters', true)   
        }else{
            tempResult = this.setList('isLength', tempResult, 'error align-items' , 
                'utility:close' , 'xx-small', 'error', 'more than 8 characters', false)
        }

        let allTrue = arr => arr.every(Boolean);
        let results = []
        for (let [_, value] of Object.entries(tempResult)) {
            results.push(value.isValid)
        }

        this.dispatchEvent(new CustomEvent('validation' , {
            detail : {
                isValid : allTrue(results),
                value : password,
                validationResult : tempResult
            }
        }))
    }
}