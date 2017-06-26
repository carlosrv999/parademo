import { Empleado } from 'app/models/empleado';
import { EmpleadoService } from 'app/services/empleado.service';
import { CocheraService } from './../../services/cochera.service';
import { Cochera } from './../../models/cochera';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-lista-cocheras',
  templateUrl: './lista-cocheras.component.html',
  styleUrls: ['./lista-cocheras.component.css']
})
export class ListaCocherasComponent implements OnInit, OnDestroy {
  cocheras: Cochera[];
  empleados: Empleado[];
  subscriptionCocheras: Subscription;

  constructor(private cocheraService: CocheraService) { }

  ngOnInit() {
    this.subscriptionCocheras = this.cocheraService.getHttpCocheras().subscribe(
      (data: Cochera[]) => {
        this.cocheras = data;
      }, (error) => {
        console.log(error);
      }
    );
  }

  

  ngOnDestroy() {
    this.subscriptionCocheras.unsubscribe();
  }

}
