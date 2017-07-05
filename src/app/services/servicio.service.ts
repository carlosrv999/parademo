import { ServicioCochera } from 'app/models/servicio-cochera';
import { AppUtil } from 'app/models/application-util';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Servicio } from './../models/servicio';
import 'rxjs/Rx';

@Injectable()
export class ServicioService {

  constructor(private http: Http) {}

  getServiciosPorCochera(id: string) {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/serviciosPorCochera?idCochera='+id);
  }

  postServicios(id: string, obj: {id_servicio: string, precio: number}) {
    return this.http.post(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/api/servicioCocheras', {
      "id_cochera": id,
      "id_servicio" : obj.id_servicio,
      "precio_hora" : obj.precio,
      "estado" : true,
    });
  }

  patchHttpServicio(servicio: ServicioCochera) {
    return this.http.patch(AppUtil.HTTP+AppUtil.IP+':'+AppUtil.PORT+'/api/servicioCocheras/'+servicio.id, {
      "precio_hora": servicio.precio_hora
    }).map(
      (response: Response) => {
        let nuevoServ: ServicioCochera = <ServicioCochera>response.json();
        console.log(response.json());
        return nuevoServ;
      }
    );
  }
}