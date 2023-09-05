import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralRoutingModule } from './general.routing.module';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { EchelonComponent } from './echelon/echelon.component';
import { EmployeComponent } from './employe/employe.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { CentreComponent } from './centre/centre.component';
import { DepartementComponent } from './departement/departement.component';
import { PosteComponent } from './poste/poste.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientComponent,
    CategoriesComponent,
    EchelonComponent,
    GestionUserComponent,
    EmployeComponent,
    AddEmployeComponent,
    CentreComponent,
    DepartementComponent,
    PosteComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    GeneralRoutingModule,
    SharedModule,
    
  ],
  exports: [
    ClientComponent,
    CategoriesComponent
  ]
})
export class GeneralModule { }
