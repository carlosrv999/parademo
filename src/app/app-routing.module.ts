import { SignupComponent } from './auth/signup/signup.component';
import { LoginGuard } from './auth/login-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { CrearServicioComponent } from './servicios/crear-servicio/crear-servicio.component';
import { ListaServiciosComponent } from './servicios/lista-servicios/lista-servicios.component';
import { CrearEmpleadoComponent } from './empleados/crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './empleados/lista-empleados/lista-empleados.component';
import { CrearCocheraComponent } from './cocheras/crear-cochera/crear-cochera.component';
import { ListaCocherasComponent } from './cocheras/lista-cocheras/lista-cocheras.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosComponent } from './empleados/empleados.component';
import { CocherasComponent } from './cocheras/cocheras.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/cocheras', pathMatch: 'full' },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'signup', canActivate: [LoginGuard], component: SignupComponent },
  { path: 'cocheras', canActivate: [AuthGuard], component: CocherasComponent, children: [
    { path: '', component: ListaCocherasComponent },
    { path: 'crear', component: CrearCocheraComponent },
  ] },
  { path: 'empleados', canActivate: [AuthGuard], component: EmpleadosComponent, children: [
    { path: '', component: ListaEmpleadosComponent },
    { path: 'crear', component: CrearEmpleadoComponent },
  ] },
  { path: 'servicios', canActivate: [AuthGuard], component: ServiciosComponent, children: [
    { path: '', component: ListaServiciosComponent },
    { path: 'crear', component: CrearServicioComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}