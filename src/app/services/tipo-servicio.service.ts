import { TipoServicio } from './../models/tipo-servicio';
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { AppUtil } from "app/models/application-util";

import 'rxjs/Rx';

@Injectable()
export class TipoServicioService {
  constructor(private http: Http) {}

  getTipoServicios() {
    return this.http.get(AppUtil.HTTP+AppUtil.IP+":"+AppUtil.PORT+"/api/tipoServicios")
      .map(
        (response: Response) => {
          let objs: TipoServicio[] = response.json();
          return objs;
        }
      );
  }
}