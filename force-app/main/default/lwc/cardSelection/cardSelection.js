import { LightningElement, track, api } from 'lwc';

export default class CardSelection extends LightningElement {
    @api flexItems
    @track selectedList = []
    
    selectCard(event){
        event.stopPropagation();
        let source = event.currentTarget.dataset.source
        this.template.querySelector(`div[data-destination='${source}']`).classList.toggle('selected')
        this.template.querySelector(`div[data-source='${source}']`).classList.toggle('border')

        let key = source.split(':')[1]
        if(this.selectedList.includes(key)){
            this.selectedList = this.selectedList.filter(item => item !== key)
        }else{
            this.selectedList.push(key)
        }

        this.dispatchEvent(new CustomEvent("updateselection" , {
            detail : this.selectedList
        }))

    }
}