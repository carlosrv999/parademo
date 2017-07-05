import { Router } from '@angular/router';
import { GeoPoint } from './../../models/geoPoint';
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
import { AgmMap } from '@agm/core';
import { AppUtil } from "app/models/application-util";

@Component({
  selector: 'app-crear-cochera',
  templateUrl: './crear-cochera.component.html',
  styleUrls: ['./crear-cochera.component.css'],
})
export class CrearCocheraComponent implements OnInit {
  title: string = 'My first AGM project';
  lima: GeoPoint = AppUtil.LIMA_GEOPOINT;
  marker: GeoPoint;
  @ViewChild('varName') map: AgmMap;
  public cocheraForm: FormGroup;
  tooltip: boolean = false;
  tipoServicios: TipoServicio[] = [];
  activatedServ: boolean[] = [];
  servicios: Servicio[];
  empleados: Empleado[];
  cochera: Cochera;

  constructor(private tipoServicioService: TipoServicioService,
              private servicioService: ServicioService,
              private empleadoService: EmpleadoService,
              private cocheraService: CocheraService,
              private fb: FormBuilder,
              private router: Router) { }

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

    this.empleadoService.getHttpEmpleadosPorEmpresa(localStorage.getItem(localStorage.key(0)))
      .subscribe(
        (response) => {
          this.empleados = response;
        }, (error) => {
          console.log(error)
        }
      );
    setTimeout(()=>{
      if(!this.cocheraForm.get('coordenadas').value) {
        this.tooltip = true;
        console.log(this.tooltip);
      }
    }, 10000);
  }



  createForm() {
    this.cocheraForm = this.fb.group({
      'nombre': [, Validators.required],
      'direccion': ['', Validators.required],
      'capacidad': [, [Validators.required, this.isInteger]],
      'telefono': ['', [Validators.required, this.isInteger]],
      'empleado': [],
      'email': [, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)],
      'username': [, Validators.required, this.forbiddenUsernames.bind(this)],
      'coordenadas': [null, Validators.required],
      'password1': [, Validators.required],
      'password2': [, Validators.required],
      'idEmpresa':[localStorage.getItem(localStorage.key(0))],
      servicios: this.fb.array([
        this.fb.group({
          precio: [5, Validators.required],
          id_servicio: ['594ff7a4a718c905936ecd83']
        })
      ])
    },{validator: this.matchPassword});
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
    console.log(JSON.stringify(this.cocheraForm.get('servicios').value));
    this.cocheraService.postHttpCocheras(this.cocheraForm).subscribe(
      (resolve) => {
        console.log(resolve);
        let nuevaCochera = <Cochera>resolve.json();
        let arrayServ: Array<{id_servicio: string, precio: number}> = <Array<{id_servicio: string, precio: number}>>this.cocheraForm.get('servicios').value;
        for(let serv of arrayServ) {
          this.servicioService.postServicios(nuevaCochera.id, {id_servicio: serv.id_servicio, precio: serv.precio})
            .subscribe(
              (response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
              }
            )
        }
        this.router.navigate(['/cocheras'], {queryParams: {exito: true}});
      }, (error) => {
        console.log(error);
      }
    );

  }

  check01() {
    return !(<FormArray>this.cocheraForm.get('servicios')).controls[0].valid && (<FormArray>this.cocheraForm.get('servicios')).controls[0].touched
  }

  check02() {
    return !(<FormArray>this.cocheraForm.get('servicios')).controls[0].valid && (<FormArray>this.cocheraForm.get('servicios')).controls[0].touched
  }

  check03() {
    return (<FormArray>this.cocheraForm.get('servicios')).controls;
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

  handleMapClick(event: {coords: GeoPoint}) {
    this.marker = new GeoPoint(event.coords.lat, event.coords.lng);
    console.log(JSON.stringify(event.coords));
    this.cocheraForm.get('coordenadas').setValue(this.marker);
    if(this.tooltip) {
      this.tooltip = false;
    }
  }

  resize(event) {
    setTimeout(()=>{
      this.map.triggerResize();
    }, 200);
  }

}
