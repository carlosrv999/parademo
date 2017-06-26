import { TipoServicio } from './../models/tipo-servicio';
import { AppUtil } from './../../assets/application-util';
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TipoServicioService {
  tipoServicios: TipoServicio[];
  constructor(private http: Http) {}

  setTipoServicios() {
    this.http.get(AppUtil.HTTP + AppUtil.IP +':'+ AppUtil.PORT +'/'+AppUtil.TIPO_SERVICIO_API);
  }
}