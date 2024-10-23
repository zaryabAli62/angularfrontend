import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-right-side-dialog',
  template: `
    <h2 mat-dialog-title>Word Dictionary</h2>
    <div mat-dialog-content>
      <p>{{ data.text }}</p>
    </div>
    <div mat-dialog-actions>
    <button 
        mat-stroked-button        
        mat-button 
        mat-dialog-close
        mat-stroked-button color="accent" class="btn-block">

        close
      </button>
    </div>
  `,
  styles: [`
    .mat-dialog-container {
      width: 400px; /* Width of the dialog */
      max-width: 100%; 
      position: absolute;
      right: 0;
    }
  `]
})
export class RightSideDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { text: string }) {}
}
