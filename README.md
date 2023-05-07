# Reusable Lightning Components
  
## 1. cardSelection Component
1. download Component from repo and upload it in your Salesforce Org.
2. use below code in Parent Component

parentComponent.html
```
<c-card-selection onupdateselection={updateSelection} flex-items={flexItems}> </c-card-selection>
```
where your ```flexItems``` will be an array of objects.
```
const flexItems = [
{
    iconName : 'doctype:audio', 
    alternativeText : 'Audio file',
    title : 'Audio'
},
...
]
```
parentComponent.js
```
updateSelection(event){
    this.selectedList = event.detail;
}
```
https://user-images.githubusercontent.com/43970894/236615430-58cdcf44-db75-4670-9cb3-762d90f4f42e.mp4

## 2. lightningRestrictedPasswordField Component
1. download Component from repo and upload it in your Salesforce Org.
2. use below code in Parent Component

parentComponent.html
```
<c-lightning-restricted-password-field validation-results={validationResults} onvalidation={getValidationResult}> </c-lightning-restricted-password-field>
```
where your ```validationResults``` will be a object storing result of every action.
4 types of check I have added [ isUpper , isSpecial, isNumber, isLength ], You can modify your component acoording to your usecase.
```
const validationResults = {
    isUpper : {
        className : 'align-items',
        iconName : 'utility:close',
        iconSize : 'xx-small',
        alternativeText : '',
        title : '',
        message : 'Upper Case',
        isValid : false
    },
    ...
}
```
parentComponent.js
```
The event.detail object will contain the following values:
{
    isValid : 'If all the given inputs pass the test cases, this will hold the value true',
    value : 'This will hold the actual input value that the user has entered',
    validationResult : 'This tracker will store and update the value after each input, 
                        allowing us to use it in a child component to validate strings'
}

getValidationResult(event){
    let isValid = event.detail.isValid
    let value = event.detail.value
    this.validationResults = event.detail.validationResult
}
```



# SalesforceLightningAlert

## How to use
1. Retrive Branch and Deploy into your Salesforce Org
2. Open your Salesforce Org and Open below mentioned URL in browser
  [ https://your-org-name.lightning.force.com/c/NotificationsModules.app ]

