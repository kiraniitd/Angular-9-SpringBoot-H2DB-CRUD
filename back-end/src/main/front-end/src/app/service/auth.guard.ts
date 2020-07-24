import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthenticationService, private router: Router){}

  canActivate(): boolean{
    console.log('In canActivate');
    const userName = sessionStorage.getItem('userName');
    console.log('canActivate - username ->',userName);
    if (this.authService.isLoggedIn()){
      console.log('TRUE');
      return true;
    } else {
      console.log('FALSE');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
