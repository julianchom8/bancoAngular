import { AgregarUsuarioComponent } from './pages/usuario/agregar-usuario/agregar-usuario.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AppComponent } from './app.Component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: UsuarioComponent},
  {path: 'usuario', component: UsuarioComponent, children: [
    {path: 'insertar', component: AgregarUsuarioComponent},
    {path: 'editar/:id', component: AgregarUsuarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
