import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "src/app/header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";
import {  MatButtonModule } from "@angular/material/button";

@NgModule({
        declarations:[
        LayoutComponent,
        HeaderComponent
        ],
        imports:[
        CommonModule,
        MatToolbarModule,
        RouterModule,
        MatButtonModule,

        ]
    
})
export class LayoutModule{}