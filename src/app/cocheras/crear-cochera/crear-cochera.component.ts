import { Cochera } from './../../models/cochera';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-crear-cochera',
  templateUrl: './crear-cochera.component.html',
  styleUrls: ['./crear-cochera.component.css']
})
export class CrearCocheraComponent implements OnInit {
  nuevaCochera: FormGroup;
  cochera: Cochera;

  constructor() { }

  ngOnInit() {
    this.nuevaCochera = new FormGroup({
      'nombre': new FormControl(null),
      'direccion': new FormControl(null),
      'capacidad': new FormControl(null),
      'telefono': new FormControl(null),
      'empleado': new FormControl(null),
      'email': new FormControl(null),
      'username': new FormControl(null),
      'password1': new FormControl(null),
      'password2': new FormControl(null),
      'servicios': new FormArray([]),
    });
  }

}
