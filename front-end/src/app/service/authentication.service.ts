import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

constructor(private http: HttpClient, private router: Router ) { }

public saveRulesDefinition(mathRulesDefinition){
   const response = this.http.post('http://localhost:8080/api/rules/addMath', mathRulesDefinition, {responseType: 'text' as 'json'});  
   console.log('Response is -saveRulesDefinition->',  JSON.stringify(response));
   return response;
  }

 public getAllRules(getData){
   const response = this.http.get('http://localhost:8080/api/rules/', getData);
   console.log('Response is -authenticateLogin->',  JSON.stringify(response));
   return response;
  }

  public deleteRuleByNum(id){
    const response = this.http.delete('http://localhost:8080/api/rules/'+id, id);
    console.log('Response is -deleteRuleNum->',  JSON.stringify(response));
    return response;
   }

 isLoggedIn() {
   const userName = sessionStorage.getItem('userName');
   if (!!userName){
      return true;
   } else {
      return false;
   }
  }

  logOut() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('token');
    this.router.navigate(['/main']);
  }

}
