export class Servicio {
  id: string;
  id_cochera: string;
  id_servicio: string;
  precio_hora: number;
  estado: boolean;
  nombre: string;

  constructor(id: string, id_cochera: string, id_servicio: string, precio_hora: number, estado: boolean, nombre: string) {
    this.id = id;
    this.id_cochera = id_cochera;
    this.id_servicio = id_servicio;
    this.precio_hora = precio_hora;
    this.estado = estado;
    this.nombre = nombre;
  }
}