import { EmpresaService } from './services/empresa.service';
import { LoginGuard } from './auth/login-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';
import { TipoServicioService } from './services/tipo-servicio.service';
import { ServicioService } from './services/servicio.service';
import { EmpleadoService } from 'app/services/empleado.service';
import { CocheraService } from './services/cochera.service';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CocherasComponent } from './cocheras/cocheras.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ListaCocherasComponent } from './cocheras/lista-cocheras/lista-cocheras.component';
import { CocheraComponent } from './cocheras/lista-cocheras/cochera/cochera.component';
import { CrearCocheraComponent } from './cocheras/crear-cochera/crear-cochera.component';
import { ListaEmpleadosComponent } from './empleados/lista-empleados/lista-empleados.component';
import { CrearEmpleadoComponent } from './empleados/crear-empleado/crear-empleado.component';
import { EmpleadoComponent } from './empleados/lista-empleados/empleado/empleado.component';
import { ListaServiciosComponent } from './servicios/lista-servicios/lista-servicios.component';
import { CrearServicioComponent } from './servicios/crear-servicio/crear-servicio.component';
import { ServicioComponent } from './servicios/lista-servicios/servicio/servicio.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from "app/auth/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CocherasComponent,
    EmpleadosComponent,
    ServiciosComponent,
    ListaCocherasComponent,
    CocheraComponent,
    CrearCocheraComponent,
    ListaEmpleadosComponent,
    CrearEmpleadoComponent,
    EmpleadoComponent,
    ListaServiciosComponent,
    CrearServicioComponent,
    ServicioComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCIeXpTlOyQyjXZlc-G4-vzHCHTwIu5fbA'
    }),
    AuthModule
  ],
  providers: [
    CocheraService, 
    EmpleadoService, 
    ServicioService,
    TipoServicioService,
    AuthService,
    AuthGuard,
    LoginGuard,
    EmpresaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
