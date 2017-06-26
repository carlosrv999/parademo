import { FormGroup } from '@angular/forms';
import { ServicioService } from './../../services/servicio.service';
import { Servicio } from './../../models/servicio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit {
  servicios: Servicio[];
  formBuscar: FormGroup;

  constructor(private servicioService: ServicioService) { }

  ngOnInit() {
    this.formBuscar = new FormGroup({});
    this.servicios = this.servicioService.getServicios();
  }

}
