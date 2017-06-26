import { EmpleadoService } from 'app/services/empleado.service';
import { AppUtil } from './../../assets/application-util';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { GeoPoint } from './../models/geoPoint';
import { Cochera } from './../models/cochera';
import { Empleado } from "app/models/empleado";

import 'rxjs/Rx';

@Injectable()
export class CocheraService {

  constructor(private http: Http,
              private empleadoService: EmpleadoService) {
  }

  getHttpCocheras() {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'getCocheraServEmp')
      .map(
        (response: Response) => {
          let responseObj = response.json();
          let cocheras = [];
          if(Array.isArray(responseObj)) {
            for(let obj of responseObj) {
              if(obj.id_empleado) {
                cocheras.push(new Cochera(obj.id,obj.id_empresa,obj.nombre,new GeoPoint(obj.coordenadas.lat, obj.coordenadas.lng),
                  obj.direccion,obj.telefono,obj.estado,obj.capacidad,obj.cupos_disp,obj.email,obj.username,new Empleado(obj.empleado.id, obj.empleado.id_empresa, obj.empleado.id_cochera, obj.empleado.nombres, 
                    obj.empleado.apellido_pat, obj.empleado.apellido_mat, obj.empleado.estado, obj.empleado.dni, obj.empleado.telefono, 
                    obj.empleado.cargo, obj.empleado.cargo)
                ));
              } else {
                cocheras.push(new Cochera(obj.id,obj.id_empresa,obj.nombre,new GeoPoint(obj.coordenadas.lat, obj.coordenadas.lng),
                  obj.direccion,obj.telefono,obj.estado,obj.capacidad,obj.cupos_disp,obj.email,obj.username,null
                ));
              }
            }
          } else {
            responseObj = [];
            responseObj.push(response.json());
          }
          return cocheras;
        }
      );
  }


}