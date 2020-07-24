import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

constructor(private http: HttpClient, private router: Router ) { }

 public authenticateLogin(authRequest){
    const response = this.http.post('http://localhost:8080/api/authenticate', authRequest, {responseType: 'text' as 'json'});
   // const response = this.http.get('http://localhost:8080/api/authenticate', authRequest,);

   // const response = this.http.get('http://localhost:9000/');
   // console.log('Response is -->',  JSON.stringify(response));
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
    this.router.navigate(['/login']);
  }

}
