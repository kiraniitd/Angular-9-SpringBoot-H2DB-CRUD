import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: AuthenticationService, ) { }

  ngOnInit(): void {
  }

  doSignOut(){
    this.service.logOut();
  }
}
