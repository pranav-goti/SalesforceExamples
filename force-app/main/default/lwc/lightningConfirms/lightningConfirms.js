import { LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';

export default class LightningConfirms extends LightningElement {

    async handleConfirmClick(event) {

        let key = event.target.dataset.key 
        const result = await LightningConfirm.open({
            message: 'Submit Form ?',
            variant: key , // [ 'headerless', 'header']
            label: 'Edit Form', // Header of Confirm Popup
        });
        //Confirm has been closed
        //result is true if OK was clicked
        //and false if cancel was clicked
    }
}