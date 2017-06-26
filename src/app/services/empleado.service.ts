import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Empleado } from './../models/empleado';
import { AppUtil } from "assets/application-util";

@Injectable()
export class EmpleadoService {
  private responseObj = [];
  private empleados: Empleado[];
  public obsEmpleados: Observable<Empleado[]>;

  constructor(private http: Http) {
    this.crearObservableEmpleados();
  }

  private crearObservableEmpleados() {
    this.obsEmpleados = Observable.create((observer: Observer<Empleado[]>) => {
      this.getHttpEmpleados().subscribe(
        (response) => {
          console.log(response.json());
        }, (error) => console.log(error)
      );
    });
  }

  getHttpEmpleado(id: string) {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+AppUtil.EMPLEADO_API+"/"+id);
  }

  getHttpEmpleados() {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+AppUtil.EMPLEADO_API);
  }

  getHttpEmpleadosPorCochera(idCochera: string) {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'getEmpleadosPorCochera?idCochera='+idCochera);
  }

  getEmpleado(id: string): Empleado {
    for (let empleado of this.empleados) {
      if (empleado.id == id) {
        return empleado;
      }
    }
    return null;
  }

  getEmpleados(): Empleado[] {
    return this.empleados;
  }

}