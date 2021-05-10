import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banco';
  constructor( private snackBar: MatSnackBar,
    private _router: Router) { }
}
