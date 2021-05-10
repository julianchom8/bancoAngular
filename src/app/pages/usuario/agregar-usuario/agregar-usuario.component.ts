import { Usuario } from './../../../model/usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  form: FormGroup;
  private id: number;
  private edicion: boolean;
  constructor(private usuarioService: UsuarioService,
     private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.edicion = params["id"] != null;
    });
    this.iniciarFormularioVacio();
    if (this.edicion === true) {
      this.cargarDatos();
    }
  }
  iniciarFormularioVacio() {
    this.form = new FormGroup({
    'nombre': new FormControl('', [Validators.required]),
    'apellido': new FormControl('', [Validators.required]),
    'ocupacion': new FormControl('', [Validators.required]),
    'sexo': new FormControl('', [Validators.required]),
    'cedula': new FormControl('', [Validators.required])
    });
  }
  cargarDatos() {
    this.usuarioService.listarPorId(this.id).subscribe(data => {
      this.form.get("nombre").setValue(data.nombre);
      this.form.get("apellido").setValue(data.apellido);
      this.form.get("ocupacion").setValue(data.ocupacion);
      this.form.get("sexo").setValue(data.sexo);
      this.form.get("cedula").setValue(data.cedula);


    });
  }
  insertar() {
    let usuario = new Usuario();
    usuario.nombre = this.form.value['nombre'];
    usuario.apellido = this.form.value['apellido'];
    usuario.ocupacion = this.form.value['ocupacion'];
    usuario.sexo = this.form.value['sexo'];
    usuario.cedula = this.form.value['cedula'];
    if (this.edicion === true) {
      usuario.id = this.id;
      this.usuarioService.editar(usuario).subscribe(() => {
        this.form.reset();
        this.usuarioService.mensajeCambio.next('usuario editado exitosamente');
        this.router.navigate(['/usuario']);
      });
    } else {
      this.usuarioService.insertar(usuario).subscribe(data => {
        this.form.reset();
        this.usuarioService.mensajeCambio.next('se guardao correctamente');
        this.router.navigate(['/usuario']);
      });
    }
  }
  
  get nombre(){
    return this.form.get('nombre');
  }
  get apellido(){
    return this.form.get('apellido');
  }
  get ocupacion(){
    return this.form.get('ocupacion');
  }
  get sexo(){
    return this.form.get('sexo');
  }
  get cedula(){
    return this.form.get('cedula');
  }
}
