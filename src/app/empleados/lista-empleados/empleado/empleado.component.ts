import { Empleado } from 'app/models/empleado';
import { EmpleadoService } from './../../../services/empleado.service';
import { EmpresaService } from './../../../services/empresa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Cochera } from "app/models/cochera";

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  loading:boolean = false;
  editMode: boolean = false;
  noModificado: boolean = false;
  @Input() cocheras: Cochera[];
  @Input() empleado: Empleado;
  @Input() index: number;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private empresaService: EmpresaService,
              private empleadoService: EmpleadoService) { }

  ngOnInit() {
    this.createForm();
    this.form.disable();    
  }



  createForm() {
    this.form = this.fb.group({
      "nombres": [this.empleado.nombres, Validators.required],
      "apellido_pat": [this.empleado.apellido_pat, Validators.required],
      "apellido_mat": [this.empleado.apellido_mat, Validators.required],
      "id_cochera": [this.empleado.id_cochera],
      "dni": [this.empleado.dni, Validators.required],
      "telefono": [this.empleado.telefono, Validators.required],
      "cargo": [this.empleado.cargo, Validators.required],
      "salario": [this.empleado.salario, Validators.required]
    });
  }

  onEditMode() {
    this.editMode = !this.editMode;
    if(this.editMode) {
      this.form.enable();
    } else {
      this.form.disable();
      this.loading = false;
    }
  }

  onCancelar() {
    this.form.reset({
      "nombres": this.empleado.nombres,
      "apellido_pat": this.empleado.apellido_pat,
      "apellido_mat": this.empleado.apellido_mat,
      "id_cochera": this.empleado.id_cochera,
      "dni": this.empleado.dni,
      "telefono": this.empleado.telefono,
      "cargo": this.empleado.cargo,
      "salario": this.empleado.salario
    });
    this.onEditMode();
    this.loading = false;
  }

  onSubmit() {
    if( 
      this.form.get('nombres').value == this.empleado.nombres &&
      this.form.get('apellido_pat').value == this.empleado.apellido_pat &&
      this.form.get('apellido_mat').value == this.empleado.apellido_mat &&
      this.form.get('id_cochera').value == this.empleado.id_cochera &&
      this.form.get('dni').value == this.empleado.dni &&
      this.form.get('telefono').value == this.empleado.telefono &&
      this.form.get('cargo').value == this.empleado.cargo &&
      this.form.get('salario').value == this.empleado.salario
     ) {
       this.noModificado = true;
       setTimeout(()=> {
         this.noModificado = false;
       }, 4000);
    } else {
      this.form.disable();
      this.loading = true;
      let empleado: Empleado = <Empleado>this.form.value;
      this.empleadoService.patchHttpEmpleado(this.empleado.id, empleado).subscribe(
        (empleado: Empleado) => {
          this.empleado = empleado;
          this.loading = false;
          this.editMode = false;
        }, (error) => {
          console.log(error);
        }
      );
      console.log(this.form.value);
    }
    
  }

}
