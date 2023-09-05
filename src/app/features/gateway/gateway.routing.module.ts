import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnauthComponent } from './unauth/unauth.component';

const routes: Routes = [
    {
        path: 'unauth', component: UnauthComponent, children: [
            { path: 'login', component: LoginComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [
        RouterModule
    ]
})

export class GatewayRoutingModule { }
