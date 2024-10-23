import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsInputComponent } from './cs-input/cs-input.component';
import { CsTextEditorComponent } from './cs-text-editor/cs-text-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RightSideDialogComponent } from './dialog/rightDialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    CsInputComponent,
    CsTextEditorComponent,
    RightSideDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    MatDialogModule


  ],
  exports:[
    CsInputComponent,
    CsTextEditorComponent ,
    RightSideDialogComponent
  ],
})
export class SharedModule { }
