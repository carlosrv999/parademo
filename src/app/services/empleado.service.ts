import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Empleado } from './../models/empleado';
import { AppUtil } from "assets/application-util";
import 'rxjs/Rx';

@Injectable()
export class EmpleadoService {

  constructor(private http: Http) {
  }

  getHttpEmpleado(id: string) {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+AppUtil.EMPLEADO_API+"/"+id);
  }

  getHttpEmpleadosPorEmpresa(idEmpresa: string) {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'empleadosPorEmpresa?idEmpresa='+idEmpresa)
      .map(
        (response: Response) => {
          let objs = response.json();
          return objs;
        }
      );
  }

  getHttpEmpleadosPorCochera(idCochera: string) {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'getEmpleadosPorCochera?idCochera='+idCochera);
  }

}