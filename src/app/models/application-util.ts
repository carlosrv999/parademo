import { GeoPoint } from './geoPoint';
export class AppUtil {
  public static HTTP: string = 'https://';
  public static HTTPS: string = 'https://';
  /*public static IP: string = '54.175.211.134';*/
  public static IP: string = 'localhost';
  public static PORT: string = '3000';
  public static TIPO_SERVICIO_API: string = 'api/tipoServicios';
  public static COCHERA_API: string = 'api/cocheras';
  public static EMPLEADO_API: string = 'api/empleados';
  public static LIMA_GEOPOINT: GeoPoint = {
    lat: -12.060897,
    lng: -77.042889
  };
}