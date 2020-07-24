import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import {DOCUMENT} from '@angular/common';

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
  getData: any;
  mathRulesDefinition: any;
  loginForm: FormGroup;
  ruleForm: FormGroup;
  submitRuleForm: FormGroup;
  deleteRuleNum: any;
  id: any;
  listOfRules = [];

  ruleNumber: any;
  math: any;
  math1: any;
  rules: any;
  payLoad: any;
  maths = [{id: 1, name: 'Value 1'}, {id: 2, name: 'Value 2'}, {id: 3, name: 'Value 3'}, {id: 4, name: 'Value 4'}];
  mathsDefault = 1;

  constructor(private service: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
              @Inject(DOCUMENT) private document: Document) {
               }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.ruleForm = this.formBuilder.group({
      math: new FormControl(this.mathsDefault),
      math1: new FormControl('Test'),
      ruleNumber: new FormControl(),     
    });

    this.submitRuleForm = this.formBuilder.group({
    });

 
  }

  doAdd() {
    console.log('In Add');
    this.payLoad = this.ruleForm.value;
    this.listOfRules.push(this.payLoad);
    console.log('listOfRules -->',this.listOfRules);
    // this.payLoad = '';
    // this.credentials.push(this.newRule());
    console.log('In Add - payload ->', this.payLoad);
  }

  onSubmit() {
    console.log('In onSubmit');
    this.mathRulesDefinition = {
      ruleDefinition:  this.ruleForm.value.math + ' ' +  this.ruleForm.value.math1
     };

    const resp = this.service.saveRulesDefinition(this.mathRulesDefinition);
    console.log('saveRulesDefinition resp is -->', resp);
    resp.subscribe(data => {
      console.log('Data is -->',  JSON.stringify(data));
      this.message = data;
      console.log('Message is -->', this.message);
    }, error => {
      this.errorMessage = error;
    });
  }

  doGetRequest() {
    console.log('In doGetRequest');
    this.getData = {};

    const resp = this.service.getAllRules(this.getData);
    console.log('resp is -->', resp);
    resp.subscribe(data => {
      console.log('Data is -->',  JSON.stringify(data));
      this.message = data;
      console.log('Message is -->', this.message);
      sessionStorage.setItem('userName', this.message);
      sessionStorage.setItem('token', '1234');
      this.router.navigate(['/home'], { queryParams: { restAPIData: JSON.stringify(data) }});
      // this.router.navigate(['/home']‌​);
    }, error => {
      this.errorMessage = error;
    });
  }

  doDelete() {
    console.log('In doDelete');
    this.id = {
      id:  this.ruleForm.value.ruleNumber 
    };
    console.log('In doDelete deleteRuleNum ->', this.id);
    console.log('In doDelete deleteRuleNum ****->', this.ruleForm.value.ruleNumber);

    const resp = this.service.deleteRuleByNum(this.ruleForm.value.ruleNumber);
    console.log('deleteRuleNum resp is -->', resp);
    resp.subscribe(data => {
      console.log('Data is -->',  JSON.stringify(data));
      this.message = data;
      console.log('Message is -->', this.message);
    }, error => {
      this.errorMessage = error;
    });

  }

}
