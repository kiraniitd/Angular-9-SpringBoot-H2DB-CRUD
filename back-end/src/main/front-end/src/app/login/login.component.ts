import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  message: any;
  errorMessage: any;
  authRequest: any;
  loginForm: FormGroup;

  constructor(private service: AuthenticationService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  doLogin() {
    this.authRequest = {
     userName: this.loginForm.value.userName,
     password: this.loginForm.value.password
    };

    // stop here if form is invalid
    if (this.loginForm.invalid) {
          console.log('Invalid Form');
          return;
    }

    const resp = this.service.authenticateLogin(this.authRequest);
    console.log('resp is -->', resp);
    resp.subscribe(data => {
      console.log('Data is -->',  JSON.stringify(data));
      this.message = data;
      console.log('Message is -->',this.message);
      sessionStorage.setItem('userName', this.message);
      sessionStorage.setItem('token', '1234');
      this.router.navigate(['/home']);
    }, error => {
      this.errorMessage = error;
    });
  }

}
