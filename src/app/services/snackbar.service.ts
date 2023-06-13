import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })

// Service in charge of injecting Angular Material's snackbar component to show notifications after different actions
export class SnackbarService {

   constructor(private snackBar: MatSnackBar) { }
   openSnack(message: string) {
      this.snackBar.open(message, 'Dismiss')._dismissAfter(3000)
   }
} 
