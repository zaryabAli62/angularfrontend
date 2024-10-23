import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './pages/authentication/register-login/register-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
 import { EffectsModule } from '@ngrx/effects'; 
 import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { itemReducer } from './core/store/reducer/project.reducer';
import { ItemEffects } from './core/store/effects/project.effects';
import { ApiService } from './core/service/api.service';
import { SharedModule } from './shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from './pages/layout/layout.module';
import { CommonModule } from '@angular/common';
import { jwtInterceptor } from './core/interceptor/auth-interceptor';
import { httpErrorsInterceptor } from './core/interceptor/http-errors-interceptor';
import { tokenExpirationInterceptor } from './core/interceptor/token-expire.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
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
    StoreModule.forRoot({itemState:itemReducer  }),    
    EffectsModule.forRoot([ItemEffects]),   
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly:false
     })  ,
     SharedModule,
     LayoutModule

  ],
  providers: [

    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        tokenExpirationInterceptor,
        httpErrorsInterceptor,
      ]),
    ),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
