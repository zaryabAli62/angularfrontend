import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string, duration: number = 3000) {
  this.snackBar.open(message,action,{duration:duration,horizontalPosition:'right',verticalPosition:'top'})
  }

  showError(message: string, action: string, duration: number = 3000) {
        this.snackBar.open(message,action,{duration:duration,horizontalPosition:'right',verticalPosition:'top'})
 
  }

  showWarning(message: string, action: string, duration: number = 3000) {
        this.snackBar.open(message,action,{duration:duration,horizontalPosition:'right',verticalPosition:'top'})
  }

  showInfo(message: string, action: string, duration: number = 3000) {
        this.snackBar.open(message,action,{duration:duration,horizontalPosition:'right',verticalPosition:'top'})
  }
  
}
