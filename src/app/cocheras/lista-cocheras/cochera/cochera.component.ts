import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { EmpleadoService } from './../../../services/empleado.service';
import { Empleado } from 'app/models/empleado';
import { CocheraService } from './../../../services/cochera.service';
import { Cochera } from "app/models/cochera";

@Component({
  selector: 'app-cochera',
  templateUrl: './cochera.component.html',
  styleUrls: ['./cochera.component.css']
})
export class CocheraComponent implements OnInit, OnChanges {
  @Input() cochera: Cochera;
  @Input() index: number;
  editMode: boolean;
  empleados: Empleado[];
  cocheraForm: FormGroup;

  constructor(private cocheraService: CocheraService,
              private empleadoService: EmpleadoService) { }

  ngOnInit() {
    this.editMode = false;
    this.cocheraForm = new FormGroup({
      'nombre': new FormControl(this.cochera.nombre),
      'direccion': new FormControl(this.cochera.direccion),
      'telefono': new FormControl(this.cochera.telefono),
      'empleado': new FormControl(this.cochera.empleado.id),
      'estado': new FormControl(this.cochera.estado),
      'capacidad': new FormControl(this.cochera.capacidad),
      'username': new FormControl(this.cochera.username)
    });
    this.cocheraForm.disable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.cochera.firstChange) {
      this.empleadoService.getHttpEmpleadosPorCochera(changes.cochera.currentValue.id).subscribe(
        (response) => {
          this.empleados = response.json();
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
      'nombre': this.cochera.nombre,
      'direccion': this.cochera.direccion,
      'telefono': this.cochera.telefono,
      'empleado': this.cochera.empleado.id,
      'estado': this.cochera.estado,
      'capacidad': this.cochera.capacidad,
      'username': this.cochera.username
    });
    this.onEditMode();
  }
}
