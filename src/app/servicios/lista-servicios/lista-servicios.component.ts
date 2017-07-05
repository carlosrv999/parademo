import { ServicioCochera } from './../../models/servicio-cochera';
import { CocheraService } from './../../services/cochera.service';
import { EmpresaService } from './../../services/empresa.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicioService } from './../../services/servicio.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Cochera } from "app/models/cochera";

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit {
  loading: boolean = false;
  noSelec: boolean = false;
  form: FormGroup;
  cocheras: Cochera[];
  servicios: ServicioCochera[];

  constructor(private servicioService: ServicioService,
              private fb: FormBuilder,
              private empresaService: EmpresaService,
              private cocheraService: CocheraService) { }

  ngOnInit() {
    this.createForm();
    let idEmpresa = localStorage.getItem(localStorage.key(0));
    this.empresaService.getHttpCocherasEmpresa(idEmpresa)
      .subscribe(
        (cocheras: Cochera[]) => {
          this.cocheras = cocheras;
        }, (error) => {
          //console.log(error);
        }
      );
  }

  createForm() {
    this.form = this.fb.group({
      "id_cochera" : [0]
    });
  }

  onSubmit() {
    if(this.form.get('id_cochera').value == 0) {
      this.noSelec = true;
      setTimeout(() => {
        this.noSelec = false;
      }, 4000);
    } else {
      this.loading = true;
      this.servicios = [];
      this.cocheraService.getServiciosCocheras(this.form.get('id_cochera').value)
        .subscribe(
          (servicioCocheras: ServicioCochera[]) => {
            //console.log(servicioCocheras);
            this.servicios = servicioCocheras;
            this.loading = false;
          }, (error) => {
            //console.log(error);
            this.loading = false;
          }
        );
    }
  }

}
