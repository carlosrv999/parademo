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
  error: boolean = false;
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
      'usrEmail': [null, Validators.required],
      'password': [null, Validators.required],
      'isEmail': [false]
    });
  }

  checkIfEmailInString(text: string) { 
    const re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }

  onSubmit() {
    this.error = false;
    this.auth.loginUser(this.loginForm.get('usrEmail').value, this.loginForm.get('password').value, this.loginForm.get('isEmail').value)
      .subscribe((response: {id: string, ttl: number, created: string, userId: string})=> {
        localStorage.setItem(response.id, response.userId);
        this.router.navigate(['/cocheras']);
      }, (error) => {
        //console.log(error);
        this.error = true;
      });
  }

  valueChange(newValue) {
    this.loginForm.get('isEmail').setValue(this.checkIfEmailInString(newValue));
  }

}
