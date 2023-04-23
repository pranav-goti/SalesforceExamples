public with sharing class CodeDiaryController {
    
    @AuraEnabled(cacheable=True)
    public static List<CodeDiary__c>  getSolutions(String searchKey){
        searchKey = '%' + searchKey + '%';
        List<CodeDiary__c> response = [select id, Subject__c, Type__c, Code__c from CodeDiary__c where Subject__c like :searchKey ];
        return response;
    }

}