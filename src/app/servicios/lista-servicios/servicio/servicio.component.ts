import { ServicioService } from './../../../services/servicio.service';
import { Component, OnInit, Input } from '@angular/core';
import { ServicioCochera } from "app/models/servicio-cochera";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  empty: boolean = false
  loading: boolean = false;
  editMode: boolean = false;
  @Input() servicio: ServicioCochera;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private servicioService: ServicioService) { }

  ngOnInit() {
    //console.log(this.servicio);
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      "estado": [this.servicio.estado],
      "id": [this.servicio.id],
      "id_cochera": [this.servicio.id_cochera],
      "id_servicio": [this.servicio.id_servicio],
      "precio_hora": [this.servicio.precio_hora, Validators.required]
    });
    this.form.disable();
  }

  onEditMode() {
    this.editMode = !this.editMode;
    if(this.editMode) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  onCancelar() {
    this.editMode = false;
    this.form.reset({
      "estado": this.servicio.estado,
      "id": this.servicio.id,
      "id_cochera": this.servicio.id_cochera,
      "id_servicio": this.servicio.id_servicio,
      "precio_hora": this.servicio.precio_hora
    });
    this.form.disable();
    this.loading = false;
  }

  onSubmit() {
    if(!this.form.valid) {
      this.empty = true;
    } else {
      this.loading = true;
      let serv: ServicioCochera = <ServicioCochera>this.form.value;
      this.servicioService.patchHttpServicio(serv).subscribe(
        (serv: ServicioCochera) => {
          this.servicio.precio_hora = serv.precio_hora;
          this.loading = false;
          this.onEditMode();
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

}
