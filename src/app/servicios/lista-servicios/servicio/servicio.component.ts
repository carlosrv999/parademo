import { Servicio } from './../../../models/servicio';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  @Input() servicio: Servicio;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
    
  }

}
