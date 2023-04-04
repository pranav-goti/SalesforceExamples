public with sharing class DynamicPageController {
    public String searchTerm { get; set; }
    public List<Account> searchResults { get; set; }

    public void search() {
        searchResults = [SELECT Name FROM Account WHERE Name LIKE :searchTerm];
    }
}