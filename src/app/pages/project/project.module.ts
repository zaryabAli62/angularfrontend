import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ItemEffects } from "src/app/core/store/effects/project.effects";
import { itemReducer } from "src/app/core/store/reducer/project.reducer";
import { SharedModule } from "src/app/shared/shared.module";
import { AddEditProjectComponent } from "./add-edit-project/add-edit-project.component";
import { ProjectListingComponent } from "./project-listing/project-listing.component";
import { ProjectRoutingModule } from "./project.routing";
import { CommonModule } from "@angular/common";

@NgModule({
        declarations: [
       
          ProjectListingComponent,
          AddEditProjectComponent,
        ],
        imports: [
          CommonModule,
          ProjectRoutingModule,
          
          FormsModule,
          HttpClientModule,
          MatToolbarModule,
          MatGridListModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule,
          MatSelectModule,
          MatRadioModule,
          MatCheckboxModule,
          MatDividerModule,
          MatButtonModule,
          MatTableModule,
          ReactiveFormsModule,
          MatSnackBarModule,
          MatDialogModule,
        //   StoreModule.forRoot({itemState:itemReducer  }),    
        //   EffectsModule.forRoot([ItemEffects]),   
        //   StoreDevtoolsModule.instrument({
        //     maxAge: 25,
        //     logOnly:false
        //    })  ,
           SharedModule,
      
        ],
        providers: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      })
      export class ProjectModule { }
      