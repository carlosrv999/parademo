import { Empleado } from 'app/models/empleado';
import { GeoPoint } from './geoPoint';
export class Cochera {
  public id: string;
  public id_empresa: string;
  public nombre: string;
  public geoPoint: GeoPoint;
  public direccion: string;
  public telefono: string;
  public estado: boolean;
  public capacidad: number;
  public cuposActuales: number;
  public email: string;
  public username: string;
  public empleado: Empleado;

  constructor(id, id_empresa, nombre, geoPoint: GeoPoint, direccion, telefono, estado, capacidad, cuposActuales, email, username, empleado: Empleado) {
    this.id = id;
    this.id_empresa = id_empresa;
    this.nombre = nombre;
    this.geoPoint = geoPoint;
    this.direccion = direccion;
    this.telefono = telefono;
    this.estado = estado;
    this.capacidad = capacidad;
    this.cuposActuales - cuposActuales;
    this.email = email;
    this.username = username;
    this.empleado = empleado;
  }


}