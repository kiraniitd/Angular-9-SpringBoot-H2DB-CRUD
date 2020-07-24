import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: AuthenticationService, private route: ActivatedRoute) { }

  @Input()
  data: any;

  restAPIData: any;

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        console.log('REST API Data -Before parse->', params.restAPIData);
        this.restAPIData =  JSON.parse(params.restAPIData);
        console.log('REST API Data -After parse->', params.restAPIData);
      }
    )
  }

  doSignOut(){
    this.service.logOut();
  }
}
