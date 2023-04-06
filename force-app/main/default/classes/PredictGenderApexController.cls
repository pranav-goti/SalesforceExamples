public class PredictGenderApexController {
    @AuraEnabled
    public static string getDataFromApi(String searchKey){
        String BASE_API = 'https://api.genderize.io/?name=';
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(BASE_API + searchKey);
        req.setMethod('GET');
        HttpResponse resp = http.send(req);
        return resp.getBody();
    }
}