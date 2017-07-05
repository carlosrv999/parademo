import { ServicioCochera } from './servicio-cochera';
import { GeoPoint } from "app/models/geoPoint";

export class CocheraServicios {
  public id: string;
  public id_empresa: string;
  public nombre: string;
  public coordenadas: GeoPoint;
  public direccion: string;
  public telefono: string;
  public estado: boolean;
  public capacidad: number;
  public cupos_disp: number;
  public email: string;
  public username: string;
  public servicioCocheras: ServicioCochera[]
}