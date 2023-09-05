import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { SideBarComponent } from './partials/side-bar/side-bar.component';
import { AuthComponent } from './partials/auth/auth.component';
import { ContainerComponent } from './partials/container/container.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    AuthComponent,
    ContainerComponent,
 
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports: [
    NavBarComponent,
    SideBarComponent,
    AuthComponent,
    ContainerComponent,
    
  ]
})
export class SharedModule { }
