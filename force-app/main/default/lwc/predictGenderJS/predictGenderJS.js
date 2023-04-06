import { LightningElement, track } from 'lwc';
const BASE_API = 'https://api.genderize.io/?name='
export default class UniversitiesJS extends LightningElement {
    
    country = ''
    foundData = showSpinner = false
    result = {}

    handleChange(event){
        this.country = event.detail.value
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.showSpinner = true
            let url = BASE_API + this.country
            fetch(url, {method: "GET" })
            .then(response => response.json())
            .then(data => {
                this.foundData = true, this.showSpinner = false, this.result = data
            });
        }
    }
}