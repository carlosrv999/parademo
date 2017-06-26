import { Empleado } from 'app/models/empleado';
import { EmpleadoService } from 'app/services/empleado.service';
import { TipoServicioService } from './../../services/tipo-servicio.service';
import { TipoServicio } from './../../models/tipo-servicio';
import { ServicioService } from './../../services/servicio.service';
import { Servicio } from './../../models/servicio';
import { Cochera } from './../../models/cochera';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

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
      'capacidad': ['ca', Validators.required],
      'telefono': ['ca', Validators.required],
      'empleado': ['59500b99a718c905936ecd88', Validators.required],
      'email': ['ca', Validators.required],
      'username': ['ca', Validators.required],
      'password1': ['ca', Validators.required],
      'password2': ['ca', Validators.required],
      servicios: this.fb.array([
        this.fb.group({
          precio: [5],
          id_servicio: ['594ff7a4a718c905936ecd83']
        })
      ])
    });
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
      precio: [''],
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
      precio : [],
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

}
