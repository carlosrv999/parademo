import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signup: boolean = false;
  loginForm: FormGroup;
  isEmail: boolean;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let obj: {signup: boolean} = <{signup: boolean}>this.route.snapshot.queryParams;
    if(obj.signup) this.signup = true;
    this.auth.isLoggedIn();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      'usrEmail': ['ca', Validators.required],
      'password': ['ca', Validators.required],
      'isEmail': [false]
    });
  }

  checkIfEmailInString(text: string) { 
    const re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }

  onSubmit() {
    console.log(this.loginForm);
    this.auth.loginUser(this.loginForm.get('usrEmail').value, this.loginForm.get('password').value, this.loginForm.get('isEmail').value)
      .subscribe((response: {id: string, ttl: number, created: string, userId: string})=> {
        console.log(response);
        localStorage.setItem(response.id, response.userId);
        this.router.navigate(['/cocheras']);
      });
  }

  valueChange(newValue) {
    console.log(this.checkIfEmailInString(newValue));
    this.loginForm.get('isEmail').setValue(this.checkIfEmailInString(newValue));
    console.log(newValue);
  }

}
