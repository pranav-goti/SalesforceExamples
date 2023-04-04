public with sharing class ShowAccountsController {
    public List<Account> accounts { get; set; }
    public ShowAccountsController() {
        accounts = [SELECT Name, Phone, Type FROM Account];
    }
}