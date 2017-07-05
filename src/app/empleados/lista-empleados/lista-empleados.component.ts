import { EmpresaService } from './../../services/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Empleado } from "app/models/empleado";
import { EmpleadoService } from "app/services/empleado.service";
import { Cochera } from "app/models/cochera";

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  loading: boolean = true;
  creado: boolean = false;
  empleados: Empleado[];
  cocheras: Cochera[];
  formBuscar: FormGroup;

  constructor(private empleadoService: EmpleadoService,
              private route: ActivatedRoute,
              private empresaService: EmpresaService) { }

  ngOnInit() {
    this.loading = true;
    this.formBuscar = new FormGroup({});
    let obj: {exito: boolean} = <{exito: boolean}>this.route.snapshot.queryParams;
    if(obj.exito) this.creado = true;
    const idEmpresa: string = localStorage.getItem(localStorage.key(0));
    this.empresaService.getHttpEmpleadosEmpresa(idEmpresa)
      .subscribe(
        (empleados: Empleado[]) => {
          this.empleados = empleados;
          this.loading = false;
        }
      );
    this.empresaService.getHttpCocherasEmpresa(idEmpresa)
      .subscribe(
        (response) => {
          this.cocheras = response;
        }
      );
  }



}
