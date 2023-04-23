import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import { createRecord, updateRecord } from "lightning/uiRecordApi";
import getSolutions from '@salesforce/apex/CodeDiaryController.getSolutions';
import TYPE_FIELD from '@salesforce/schema/CodeDiary__c.Type__c';
import ID_FIELD from "@salesforce/schema/CodeDiary__c.Id";
import CODE_FIELD from '@salesforce/schema/CodeDiary__c.Code__c';
import SUBJECT_FIELD from '@salesforce/schema/CodeDiary__c.Subject__c';
import CD_OBJECT from '@salesforce/schema/CodeDiary__c';
import EditorAPI from '@salesforce/resourceUrl/EditorAPI';

const JS_FILES = ['/codemirror.js', '/javascript.js', '/javascript-hint.js', '/html-hint.js', '/css-hint.js', '/matchbrackets.js', '/closebrackets.js', '/colorize.js', '/sublime.js', '/codemirror.css', '/oceanic-next.css']

export default class CodingDiary extends LightningElement {

    promiseLists = []
    connectedCallback() {
        JS_FILES.forEach(item => {
            if (item.endsWith('.css')) {
                this.promiseLists.push(loadStyle(this, EditorAPI + item))
            } else {
                this.promiseLists.push(loadScript(this, EditorAPI + item))
            }
        })
    }

    @wire(getObjectInfo, { objectApiName: CD_OBJECT })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: TYPE_FIELD
    })
    typePicklistValues;

    codeMirrorInitialized = false;
    keyword = ''
    showSpinner = false
    selectedType = ''
    selectedSubject = ''
    editor = ''
    solutions = []
    isCreate = true
    lastRecordId = null

    renderedCallback() {
        if (this.codeMirrorInitialized) {
            return
        }
        this.codeMirrorInitialized = true

        Promise.all(this.promiseLists).then(() => {
            this.loadDiary();
        }).catch(error => {
            console.log(error)
            this.dispatchEvent(
                new ShowToastEvent({ title: 'Error loading External CDN', message: error.message, variant: 'error' })
            );
        });
    }
    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13
        if (isEnterKey) {
            this.showSpinner = true

            getSolutions({searchKey : this.keyword}).then(result => {

                if(result && result.length > 0){
                    result = result.map(obj => ({ ...obj, className: 'tag ' }))
                    result.forEach(item => {
                        item.className += item.Type__c
                    })
                    this.solutions = result
                    this.showSpinner = false
                }else{
                    this.showSpinner = false
                    this.dispatchEvent( new ShowToastEvent({ title: 'No Data found !!!!', variant: 'success' }) )
                }
            }).catch(error => {
                this.dispatchEvent( new ShowToastEvent({ title: 'Error loading Solutions', message: error.message, variant: 'error' }) )
                this.showSpinner = false
            })

        }
    }
    reset(){
        this.isCreate = true
        this.editor.getDoc().setValue('')
        this.selectedType = ''
        this.selectedSubject = ''
        this.lastRecordId = null
    }
    handleClick(event){
        let key =  event.currentTarget.dataset.item;
        if(key){
            let record = this.solutions.filter(item => item.Id === key)
            record.forEach(item => {
                this.editor.getDoc().setValue(item.Code__c)
                this.selectedType = item.Type__c
                this.selectedSubject = item.Subject__c
            })
            this.isCreate = false
            this.lastRecordId = key
        }
    }
    createUpdateRecord(){
        var textToWrite = this.editor.doc.getValue()

        let fields = {}
        fields[CODE_FIELD.fieldApiName] = textToWrite
        fields[TYPE_FIELD.fieldApiName] = this.selectedType
        fields[SUBJECT_FIELD.fieldApiName] = this.selectedSubject
        if(!this.isCreate) {
            fields[ID_FIELD.fieldApiName] = this.lastRecordId
        }
        let recordInput = {}
        if(this.isCreate) {
            recordInput = { apiName: CD_OBJECT.objectApiName, fields: fields }
            createRecord(recordInput).then((record) => {
                this.dispatchEvent( new ShowToastEvent({ title: 'Record Created!!!', message: record.id, variant: 'success' }) )
            });
        }else{
            recordInput = { fields: fields }
            updateRecord(recordInput).then((record) => {
                this.dispatchEvent( new ShowToastEvent({ title: 'Record Updated!!!', message: record.id, variant: 'success' }) )
            });
        }

    }
    updateSnippet(){ this.createUpdateRecord() }
    saveSnippet() { this.createUpdateRecord() }
    handleChange(event) { this.keyword = event.detail.value }
    handleTypeChange(event) { this.selectedType = event.detail.value }
    handleSubjectChange(event) { this.selectedSubject = event.detail.value }
    loadDiary() {
        let myTextarea = this.template.querySelector('textarea')
        this.editor = CodeMirror.fromTextArea(myTextarea, {
            lineNumbers: true,
            theme: 'oceanic-next',
            mode: "javascript"
        })
    }
}