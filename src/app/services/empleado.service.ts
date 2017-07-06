import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Empleado } from './../models/empleado';
import 'rxjs/Rx';
import { AppUtil } from "app/models/application-util";

@Injectable()
export class EmpleadoService {

  constructor(private http: Http) {
  }

  getHttpEmpleado(id: string) {
    return this.http.get(AppUtil.HTTPS+AppUtil.IP+'/'+AppUtil.EMPLEADO_API+"/"+id);
    /*return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+AppUtil.EMPLEADO_API+"/"+id);*/
  }

  getHttpEmpleadosPorEmpresa(idEmpresa: string) {
    return this.http.get(AppUtil.HTTPS+AppUtil.IP+'/'+'empleadosPorEmpresa?idEmpresa='+idEmpresa)
    /*return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'empleadosPorEmpresa?idEmpresa='+idEmpresa)*/
      .map(
        (response: Response) => {
          let objs = response.json();
          return objs;
        }
      );
  }

  getHttpEmpleadosPorCochera(idCochera: string) {
    return this.http.get(AppUtil.HTTPS+AppUtil.IP+'/'+'getEmpleadosPorCochera?idCochera='+idCochera);
    //return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'getEmpleadosPorCochera?idCochera='+idCochera);
  }

  postHttpEmpleado(empleado: Empleado) {
    return this.http.post(AppUtil.HTTPS+AppUtil.IP+'/'+'api/empleados', {
    //return this.http.post(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'api/empleados', {
      "id_empresa": empleado.id_empresa,
      "id_cochera": empleado.id_cochera,
      "nombres": empleado.nombres,
      "apellido_pat": empleado.apellido_pat,
      "apellido_mat": empleado.apellido_mat,
      "estado": empleado.estado,
      "dni": empleado.dni,
      "telefono": empleado.telefono,
      "cargo": empleado.cargo,
      "salario": empleado.salario
    });
  }

  patchHttpEmpleado(id: string, empleado :Empleado) {
    return this.http.patch(AppUtil.HTTPS+AppUtil.IP+'/'+'api/empleados/'+id, {
    //return this.http.patch(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'api/empleados/'+id, {
      "nombres": empleado.nombres,
      "apellido_pat": empleado.apellido_pat,
      "apellido_mat": empleado.apellido_mat,
      "dni": empleado.dni,
      "telefono": empleado.telefono,
      "cargo": empleado.cargo,
      "salario": empleado.salario,
      "id_cochera": empleado.id_cochera,
    }).map(
      (response: Response) => {
        let empleado: Empleado = <Empleado>response.json();
        return empleado;
      }
    );
  }

}