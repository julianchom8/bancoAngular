import { environment } from '../../environments/environment';
import { Usuario } from '../model/usuario';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.HOST}/usuario`;
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) { }

  listarPaginado(page: number, size: number){
    return this.http.get<any>(`${this.url}/retornarPaginado/${page}/${size}`);
    }
  listar() {
    return this.http.get<Usuario[]>(`${this.url}/listar`);
  }
  insertar(usuario: Usuario){
    return this.http.post(`${this.url}/insertar`, usuario);
  }
  listarPorId(id: number){
    return this.http.get<any>(`${this.url}/retornarPorId/${id}`);
  }
  editar(usuario: Usuario){
    return this.http.put(`${this.url}/editar`, usuario);
  }
  eliminar(id: number){
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
}

