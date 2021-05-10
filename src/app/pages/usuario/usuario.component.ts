import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Usuario } from './../../model/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'ocupacion', 'sexo', 'cedula', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<Usuario>();
  form: FormGroup;
  cantidad: number;
  pageIndex: number = 1;
  pageSize: number = 5;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static : true }) sort: MatSort;

  constructor(private usuarioService: UsuarioService, private snackBar: MatSnackBar,
    public route: ActivatedRoute,  private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.mensajeCambio.subscribe(data => {
      this.openSnackBar(data);
      this.listarPaginado();
    });
    this.listarPaginado();
    this.usuarioService.mensajeCambio.subscribe(data =>{
      this.openSnackBar(data);
      
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cambiarPagina(e: any){
    this.pageIndex = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.listarPaginado();
   }
   listarPaginado(){
    this.usuarioService.listarPaginado(this.pageIndex, this.pageSize).subscribe(
      data => {
        console.log(data.cantidad);
        this.dataSource = new MatTableDataSource(data.content);
       // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cantidad = data.cantidad;
        
      }
    );
 }
 eliminarUsuarioPorId(id: number){
  this.usuarioService.eliminar(id).subscribe(data =>{
    this.form.reset();
     this.listarPaginado();
     this.usuarioService.mensajeCambio.next('Usuario eliminado corretamente');
   });
 }

 openSnackBar(message: string) {
  this.snackBar.open(message, 'Informacion', {
    duration: 2000,
  });
}
}