import { ActivatedRoute } from '@angular/router';
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
  creado: boolean = false;
  cocheras: Cochera[];
  empleados: Empleado[];
  subscriptionCocheras: Subscription;

  constructor(private cocheraService: CocheraService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let obj: {exito: boolean} = <{exito: boolean}>this.route.snapshot.queryParams;
    if(obj.exito) this.creado = true;
    console.log(localStorage.getItem(localStorage.key(0)));
    const idEmpresa: string = localStorage.getItem(localStorage.key(0));
    this.subscriptionCocheras = this.cocheraService.getHttpCocheras(idEmpresa).subscribe(
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
