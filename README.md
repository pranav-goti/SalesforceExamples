# Reusable Lightning Components
  
## 1.cardSelection Component
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


# SalesforceLightningAlert

## How to use
1. Retrive Branch and Deploy into your Salesforce Org
2. Open your Salesforce Org and Open below mentioned URL in browser
  [ https://your-org-name.lightning.force.com/c/NotificationsModules.app ]

