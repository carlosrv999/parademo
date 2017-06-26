import { Empleado } from './../../../models/empleado';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  @Input() empleado: Empleado;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
