import { CocheraService } from './../../services/cochera.service';
import { Observable } from 'rxjs/Observable';
import { Empleado } from 'app/models/empleado';
import { EmpleadoService } from 'app/services/empleado.service';
import { TipoServicioService } from './../../services/tipo-servicio.service';
import { TipoServicio } from './../../models/tipo-servicio';
import { ServicioService } from './../../services/servicio.service';
import { Servicio } from './../../models/servicio';
import { Cochera } from './../../models/cochera';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-crear-cochera',
  templateUrl: './crear-cochera.component.html',
  styleUrls: ['./crear-cochera.component.css']
})
export class CrearCocheraComponent implements OnInit {
  public cocheraForm: FormGroup;
  tipoServicios: TipoServicio[] = [];
  activatedServ: boolean[] = [];
  servicios: Servicio[];
  empleados: Empleado[];
  cochera: Cochera;

  constructor(private tipoServicioService: TipoServicioService,
              private empleadoService: EmpleadoService,
              private cocheraService: CocheraService,
              private fb: FormBuilder) { }

  ngOnInit() {
    
    this.createForm();

    this.tipoServicioService.getTipoServicios().subscribe(
      (response) => {
        for(let obj of response) {
          if (obj.id === '594ff7a4a718c905936ecd83') continue;
          this.tipoServicios.push(obj);
          this.activatedServ.push(false);
        }
        console.log(this.activatedServ);
      }, (error) => {
        this.tipoServicios = [];
      }
    );

    this.empleadoService.getHttpEmpleadosPorEmpresa('595007dda718c905936ecd84')
      .subscribe(
        (response) => {
          this.empleados = response;
        }, (error) => {
          console.log(error)
        }
      );
  }



  createForm() {
    this.cocheraForm = this.fb.group({
      'nombre': ['ca', Validators.required],
      'direccion': ['ca', Validators.required],
      'capacidad': [5, [Validators.required, this.isInteger]],
      'telefono': ['ca', [Validators.required, this.isInteger]],
      'empleado': ['59500b99a718c905936ecd88', Validators.required],
      'email': ['ca', [Validators.required, Validators.email], this.forbiddenEmails.bind(this)],
      'username': ['ca', Validators.required, this.forbiddenUsernames.bind(this)],
      'password1': ['ca', Validators.required],
      'password2': ['ca', Validators.required],
      servicios: this.fb.array([
        this.fb.group({
          precio: [5, Validators.required],
          id_servicio: ['594ff7a4a718c905936ecd83']
        })
      ])
    },{validator: this.matchPassword});
    // this.cocheraForm = new FormGroup({
    //   'nombre': new FormControl("culo"),
    //   'direccion': new FormControl("null"),
    //   'capacidad': new FormControl("null"),
    //   'telefono': new FormControl("null"),
    //   'empleado': new FormControl(0),
    //   'precio': new FormControl("null"),
    //   'email': new FormControl("null"),
    //   'username': new FormControl("null"),
    //   'password1': new FormControl("null"),
    //   'password2': new FormControl("null"),
    // });

    
  }

  initServicios() {
    return this.fb.group({
      precio: ['', Validators.required],
      id_servicio: [''],
      nombre: ['']
    });
  }

  onChange(i: number, tipo: TipoServicio) {
    //console.log(tipo);
    const prev: boolean = this.activatedServ[i];
    this.activatedServ[i] = !this.activatedServ[i];
    //console.log(this.activatedServ);
    if( prev == false && this.activatedServ[i] == true ) {
      this.addServicio(tipo);
    } else if (prev == true && this.activatedServ[i]==false) {
      this.removeServicio(tipo);
    }
    //console.log(this.cocheraForm.controls);
  }

  addServicio(tipo: TipoServicio) {
    const control = <FormArray>this.cocheraForm.controls['servicios'];
    control.push(this.fb.group({
      precio : [, Validators.required],
      id_servicio : [tipo.id],
      nombre: tipo.nombre
    }));
  }

  removeServicio(tipo: TipoServicio) {
    const control = <FormArray>this.cocheraForm.controls['servicios'];
    for(let i = 0; i < control.length; i++){
      if(control.controls[i].value.id_servicio == tipo.id) control.removeAt(i);
    }
  }

  removeServicioLast() {
    const control = <FormArray>this.cocheraForm.controls['servicios'];
    control.removeAt(control.length-1);
  }

  onSubmit(form: FormGroup) {
    console.log(this.cocheraForm.value);
  }

  onShowForm() {
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.cocheraService.getEmails().subscribe(
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
      this.cocheraService.getEmails().subscribe(
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

  passwordChecker(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        let password1 = this.cocheraForm.get('password1'), password2 = this.cocheraForm.get('password2');
        console.log(password1.value+'  '+password2.value);
        if(password1.value !== password2.value) {
          resolve({'passwordsNotMatch': true});
        } else {
          resolve(null);
        }
      }, 150);
    });
    return promise;
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

  isInteger(AC: FormControl) {
    if(!Number.isInteger(AC.value)){
      return {notInteger: true};
    }
      
    else return null;
  }

}
