import { Router } from '@angular/router';
import { EmpleadoService } from './../../services/empleado.service';
import { EmpresaService } from './../../services/empresa.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Cochera } from "app/models/cochera";
import { Empleado } from "app/models/empleado";

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
  error: boolean = false;
  loading: boolean = false;
  @Input() cocheras: Cochera[];
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private empleadoService: EmpleadoService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
    const idEmpresa: string = localStorage.getItem(localStorage.key(0));
    this.empresaService.getHttpCocherasEmpresa(idEmpresa)
      .subscribe(
        (response) => {
          this.cocheras = response;
        }
      );
  }

  createForm() {
    this.form = this.fb.group({
      "nombres": [null, Validators.required],
      "apellido_pat": [null, Validators.required],
      "apellido_mat": [null, Validators.required],
      "id_cochera": ['0'],
      "estado": [true],
      "id_empresa" : [localStorage.getItem(localStorage.key(0))],
      "dni": [null, [Validators.required, this.isDNILength]],
      "telefono": [null, Validators.required],
      "cargo": [null, Validators.required],
      "salario": [null, Validators.required]
    });
  }

  isDNILength(AC: FormControl) {
    let dni: number = AC.value;
    if(dni !== null){
      if(dni.toString().length != 8) return { notDNI: true };
      else return null;
    }
    else return null;
  }

  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      let empleado: Empleado = <Empleado>this.form.value;
      this.empleadoService.postHttpEmpleado(empleado).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/empleados'], {queryParams: {exito: true}});
        }, (error) => {
          console.log(error);
        }
      )
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 4000);
    }
  }

}
