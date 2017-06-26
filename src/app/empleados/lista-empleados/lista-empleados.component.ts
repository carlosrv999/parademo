import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Empleado } from "app/models/empleado";
import { EmpleadoService } from "app/services/empleado.service";

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  empleados: Empleado[];
  formBuscar: FormGroup;

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit() {
    this.formBuscar = new FormGroup({});
  }

}
