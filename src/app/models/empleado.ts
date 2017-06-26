export class Empleado {
  id: string;
  id_empresa: string;
  id_cochera: string;
  nombres: string;
  apellido_pat: string;
  apellido_mat: string;
  estado: boolean;
  dni: number;
  telefono: string;
  cargo: string;
  salario: string;

  constructor(id: string,
  id_empresa: string,
  id_cochera: string,
  nombres: string,
  apellido_pat: string,
  apellido_mat: string,
  estado: boolean,
  dni: number,
  telefono: string,
  cargo: string,
  salario: string) {
    this.id = id;
    this.id_cochera = id_cochera;
    this.id_empresa = id_empresa;
    this.nombres = nombres;
    this.apellido_pat = apellido_pat;
    this.apellido_mat = apellido_mat;
    this.estado = estado;
    this.dni = dni;
    this.telefono = telefono;
    this.cargo = cargo;
    this.salario = salario;
  }
}