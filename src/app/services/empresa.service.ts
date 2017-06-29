import { Empresa } from './../models/empresa';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { AppUtil } from "app/models/application-util";
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