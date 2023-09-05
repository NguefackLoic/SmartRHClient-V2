import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UnauthComponent } from './unauth/unauth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GatewayRoutingModule } from './gateway.routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    UnauthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GatewayRoutingModule
  ]
})
export class GatewayModule { }
