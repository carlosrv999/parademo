import { GeoPoint } from './../../../models/geoPoint';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { EmpleadoService } from './../../../services/empleado.service';
import { Empleado } from 'app/models/empleado';
import { CocheraService } from './../../../services/cochera.service';
import { Cochera } from "app/models/cochera";
import { AgmMap } from '@agm/core';
import { AppUtil } from "app/models/application-util";

@Component({
  selector: 'app-cochera',
  templateUrl: './cochera.component.html',
  styleUrls: ['./cochera.component.css']
})
export class CocheraComponent implements OnInit, OnChanges {
  creado: boolean = false;
  @ViewChild('varName') map: AgmMap;
  @ViewChild('varName2') mapEdit: AgmMap;
  lima: GeoPoint = AppUtil.LIMA_GEOPOINT;
  marker1: GeoPoint;
  @Input() cochera: Cochera;
  @Input() index: number;
  editMode: boolean = false;
  empleados: Empleado[];
  cocheraForm: FormGroup;

  constructor(private cocheraService: CocheraService,
              private empleadoService: EmpleadoService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.editMode = false;
    this.createForm();
    this.cocheraForm.disable();
  }

  isInteger(AC: FormControl) {
    if(!Number.isInteger(AC.value)){
      return {notInteger: true};
    }
      
    else return null;
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

  createForm() {
    this.cocheraForm = this.fb.group({
      'id': [this.cochera.id],
      'nombre': [this.cochera.nombre, Validators.required],
      'direccion': [this.cochera.direccion, Validators.required],
      'capacidad': [this.cochera.capacidad, [Validators.required, this.isInteger]],
      'telefono': [this.cochera.telefono, [Validators.required, this.isInteger]],
      'empleado': [this.cochera.empleado ? this.cochera.empleado.id : null, Validators.required],
      'estado': [this.cochera.estado, Validators.required],
      'email': [this.cochera.email, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)],
      'username': [this.cochera.username, Validators.required, this.forbiddenUsernames.bind(this)],
      'coordenadas': [this.cochera.geoPoint, Validators.required],
      servicios: this.fb.array([
        this.fb.group({
          precio: [5, Validators.required],
          id_servicio: ['594ff7a4a718c905936ecd83']
        })
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.cochera.firstChange) {
      this.empleadoService.getHttpEmpleadosPorCochera(changes.cochera.currentValue.id).subscribe(
        (response) => {
          this.empleados = response.json();
          this.marker1 = this.cochera.geoPoint;
          console.log(this.cochera);
        }, (error) => {
          this.empleados = [];
        }
      );
    }
  }

  onEditMode() {
    this.cocheraForm.disabled ? this.cocheraForm.enable() : this.cocheraForm.disable();
  }

  onCancelar() {
    this.cocheraForm.reset({
      'id': this.cochera.id,
      'nombre': this.cochera.nombre,
      'direccion': this.cochera.direccion,
      'capacidad': this.cochera.capacidad,
      'telefono': this.cochera.telefono,
      'empleado': this.cochera.empleado.id,
      'estado': this.cochera.estado,
      'email': this.cochera.email,
      'username': this.cochera.username,
      'coordenadas': this.cochera.geoPoint
    });
    this.marker1 = this.cochera.geoPoint;
    this.onEditMode();
  }

  handleMapClick(event: {coords: GeoPoint}) {
    this.marker1 = new GeoPoint(event.coords.lat, event.coords.lng);
    console.log(JSON.stringify(event.coords));
    this.cocheraForm.get('coordenadas').setValue(this.marker1);
  }

  onSubmit() {
    console.log(this.cocheraForm);
    this.cocheraService.patchHttpCocheras(this.cocheraForm)
      .subscribe(
        (response) => {
          console.log(response);
          this.onEditMode();
        }, (error) => {
          console.log(error);
        }
      );
  }

  resize(event) {
    setTimeout(()=>{
      this.map.triggerResize();
      this.mapEdit.triggerResize();
    }, 200);
  }
  resize2(event) {
    setTimeout(()=>{
      this.mapEdit.triggerResize();
    }, 200);
  }
}
