import { LightningElement } from 'lwc';
import getDataFromApi from "@salesforce/apex/PredictGenderApexController.getDataFromApi";
export default class PredictGenderApex extends LightningElement {
    country = ''
    foundData = false
    result = {}
    showSpinner = false

    handleChange(event){
        this.country = event.detail.value
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.showSpinner = true

            getDataFromApi({searchKey : this.country}).then(data => {
                this.foundData = true
                this.showSpinner = false
                this.result = JSON.parse(data)
            }).catch(error => {
                console.log({error})
            })

        }
    }
}