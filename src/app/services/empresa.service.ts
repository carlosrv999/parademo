import { Empleado } from 'app/models/empleado';
import { Empresa } from './../models/empresa';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { AppUtil } from "app/models/application-util";
import { Cochera } from "app/models/cochera";
@Injectable()
export class EmpresaService {
  constructor(private http: Http) {}

  crearEmpresa(empresa: Empresa, password: string) {
    return this.http.post(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/api/empresas', {
        "razon_social": empresa.razon_social,
        "telefono": empresa.telefono,
        "direccion": empresa.direccion,
        "username": empresa.username,
        "email": empresa.email,
        "password": password
      });
  }

  getHttpEmpleadosEmpresa(id: string) {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/api/empresas/'+id+'?filter[include]=empleados')
      .map(
        (response: Response) => {
          let empleados: Empleado[] = response.json().empleados;
          return empleados;
        }
      );
  }

  getHttpCocherasEmpresa(id: string) {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/api/empresas/'+id+'?filter[include]=cocheras')
      .map(
        (response: Response) => {
          let cocheras: Cochera[] = response.json().cocheras;
          return cocheras;
        }
      );
  }

  getEmails() {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'obtenerEmailsEmpresa')
      .map(
        (response: Response) => {
          let responseObj: Array<{username: string, email: string}> = response.json();
          return responseObj;
        }
      );
  }
}