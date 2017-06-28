import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Empresa } from './../../models/empresa';
import { EmpresaService } from './../../services/empresa.service';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  failed: boolean = false;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      'username': ['', Validators.required, this.forbiddenUsernames.bind(this)],
      'email': ['', [Validators.required, Validators.email], this.forbiddenEmails.bind(this)],
      'razon_social': ['', Validators.required],
      'telefono': ['', [Validators.required, this.isInteger]],
      'direccion': ['', Validators.required],
      'password1': ['',Validators.required],
      'password2': ['',Validators.required]
    }, {validator: this.matchPassword});
  }

  isInteger(AC: FormControl) {
    if(!Number.isInteger(AC.value)){
      return {notInteger: true};
    }
      
    else return null;
  }

  matchPassword(AC: AbstractControl) {
       let password = AC.get('password1').value; // to get value in input tag
       let confirmPassword = AC.get('password2').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('password2').setErrors( {MatchPassword: true} )
        } else {
            return null;
        }
    }
  
  onSubmit() {
    let empresa: Empresa = new Empresa();
    empresa.direccion = this.signupForm.get('direccion').value;
    empresa.email = this.signupForm.get('email').value;
    empresa.razon_social = this.signupForm.get('razon_social').value;
    empresa.telefono = this.signupForm.get('telefono').value;
    empresa.username = this.signupForm.get('username').value;
    let password: string = this.signupForm.get('password2').value;
    this.empresaService.crearEmpresa(empresa, password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login'], {queryParams: {signup: true}});
      }, (error) => {
        this.failed = true;
        console.log(error.status);
      }
    )
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.empresaService.getEmails().subscribe(
        (response) => {
          for(let obj of response) {
            if(obj.email.trim() == control.value){
              resolve({'emailIsForbidden': true});
            }
          }
          resolve(null);
        }
      );
    });
    return promise;
  }

  forbiddenUsernames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.empresaService.getEmails().subscribe(
        (response) => {
          for(let obj of response) {
            if(obj.username.trim() == control.value){
              resolve({'usernameIsForbidden': true});
            }
          }
          resolve(null);
        }
      );
    });
    return promise;
  }

}
