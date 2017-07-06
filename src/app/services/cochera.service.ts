import { CocheraServicios } from './../models/cochera-servicios';
import { FormGroup } from '@angular/forms';
import { EmpleadoService } from 'app/services/empleado.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { GeoPoint } from './../models/geoPoint';
import { Cochera } from './../models/cochera';
import { Empleado } from "app/models/empleado";

import 'rxjs/Rx';
import { AppUtil } from "app/models/application-util";

@Injectable()
export class CocheraService {

  constructor(private http: Http,
              private empleadoService: EmpleadoService) {
  }

  getHttpCocheras(idEmpresa: string) {
    return this.http.get(AppUtil.HTTPS+AppUtil.IP+'/'+'getCocheraServEmpPorEmpresa?idEmpresa='+idEmpresa)
    /*return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'getCocheraServEmpPorEmpresa?idEmpresa='+idEmpresa)*/
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

  postHttpCocheras(form: FormGroup) {
    if((<string>form.get('empleado').value).length < 3){
      return this.http.post(AppUtil.HTTPS+AppUtil.IP+'/'+'api/cocheras', 
      //return this.http.post(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'api/cocheras', 
        {
          "id_empresa": form.get('idEmpresa').value,
          "nombre": form.get('nombre').value,
          "coordenadas": {
            "lat": (<GeoPoint>form.get('coordenadas').value).lat,
            "lng": (<GeoPoint>form.get('coordenadas').value).lng
          },
          "direccion": form.get('direccion').value,
          "telefono": form.get('telefono').value,
          "estado": true,
          "capacidad": form.get('capacidad').value,
          "cupos_disp": form.get('capacidad').value,
          "username": form.get('username').value,
          "email": form.get('email').value,
          "password": form.get('password2').value,
        }
      );
    } else {
      return this.http.post(AppUtil.HTTPS+AppUtil.IP+'/'+'api/cocheras', 
      //return this.http.post(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'api/cocheras', 
        {
          "id_empresa": form.get('idEmpresa').value,
          "id_empleado": form.get('empleado').value,
          "nombre": form.get('nombre').value,
          "coordenadas": {
            "lat": (<GeoPoint>form.get('coordenadas').value).lat,
            "lng": (<GeoPoint>form.get('coordenadas').value).lng
          },
          "direccion": form.get('direccion').value,
          "telefono": form.get('telefono').value,
          "estado": true,
          "capacidad": form.get('capacidad').value,
          "cupos_disp": form.get('capacidad').value,
          "username": form.get('username').value,
          "email": form.get('email').value,
          "password": form.get('password2').value,
        }
      );
    }
  }

  patchHttpCocheras(form: FormGroup, cap: boolean) {
    if(cap) {
      return this.http.patch(AppUtil.HTTPS+AppUtil.IP+'/'+'api/cocheras/'+form.get('id').value, {
      //return this.http.patch(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'api/cocheras/'+form.get('id').value, {
        "id_empleado": form.get('empleado').value,
        "nombre": form.get('nombre').value,
        "coordenadas": {
            "lat": (<GeoPoint>form.get('coordenadas').value).lat,
            "lng": (<GeoPoint>form.get('coordenadas').value).lng
        },
        "direccion": form.get('direccion').value,
        "telefono": form.get('telefono').value,
        "estado": form.get('estado').value,
        "capacidad": form.get('capacidad').value,
        "cupos_disp": form.get('capacidad').value,
        "username": form.get('username').value,
        "email": form.get('email').value,
      });
    } else {
      return this.http.patch(AppUtil.HTTPS+AppUtil.IP+'/'+'api/cocheras/'+form.get('id').value, {
      //return this.http.patch(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'api/cocheras/'+form.get('id').value, {
        "id_empleado": form.get('empleado').value,
        "nombre": form.get('nombre').value,
        "coordenadas": {
            "lat": (<GeoPoint>form.get('coordenadas').value).lat,
            "lng": (<GeoPoint>form.get('coordenadas').value).lng
        },
        "direccion": form.get('direccion').value,
        "telefono": form.get('telefono').value,
        "estado": form.get('estado').value,
        "username": form.get('username').value,
        "email": form.get('email').value,
      });
    }
  }

  getServiciosCocheras(id: string) {
    return this.http.get(AppUtil.HTTPS+AppUtil.IP+'/'+AppUtil.COCHERA_API+'/'+id+'?filter[include][servicioCocheras]=tipoServicio')
    //return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+AppUtil.COCHERA_API+'/'+id+'?filter[include][servicioCocheras]=tipoServicio')
      .map(
        (response: Response) => {
          let cochera: CocheraServicios = <CocheraServicios>response.json();
          //console.log(response.json());
          return cochera.servicioCocheras;
        }
      );
  }

  getEmails() {
    return this.http.get(AppUtil.HTTPS+AppUtil.IP+'/'+'obtenerEmails')
    //return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/'+'obtenerEmails')
      .map(
        (response: Response) => {
          let responseObj: Array<{username: string, email: string}> = response.json();
          return responseObj;
        }
      );
  }

}