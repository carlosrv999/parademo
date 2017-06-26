import { Servicio } from './../models/servicio';
export class ServicioService {
  private servicios: Servicio[] = [
    new Servicio('1', '1', '1', 5, true, 'Alquiler de Cupo'),
    new Servicio('2', '1', '1', 6, true, 'Lavado de Autos'),
    new Servicio('3', '1', '1', 7, true, 'Encerado de Autos'),
  ];

  getServicio(id: string): Servicio {
    for (let servicio of this.servicios) {
      if (servicio.id == id) {
        return servicio;
      }
    }
    return null;
  }

  getServicios(): Servicio[] {
    return this.servicios;
  }
}