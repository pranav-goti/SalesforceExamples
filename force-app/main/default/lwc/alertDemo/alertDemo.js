import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';

export default class AlertDemo extends LightningElement {

    async handleAlertClick(event) {
        let theme = event.target.dataset.theme
        
        await LightningAlert.open({
            message: 'BANKAI SENBONZAKURA KAGEYOSHI',
            theme: theme, 
            label: theme, 
        });
    }

}