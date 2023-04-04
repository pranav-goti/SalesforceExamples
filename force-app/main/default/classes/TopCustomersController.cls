public with sharing class TopCustomersController {
    public List<Customer__c> customers { get; set; }
    public TopCustomersController() {
        customers = [SELECT Name, Total_Purchases__c FROM Customer__c ORDER BY Total_Purchases__c DESC LIMIT 10];
    }
}