import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/gateway/login/login.component';
import { ClientComponent } from './features/general/client/client.component';

const routes: Routes = [
  { path: '', redirectTo: '/gateway/unauth/login', pathMatch: 'full' },
  { path: 'gateway', loadChildren: () => import('./features/gateway/gateway.module').then(m => m.GatewayModule) },
  {
    path: 'general',
    loadChildren: () => import('./features/general/general.module').then(m => m.GeneralModule)
  },
  { path: 'client', component: ClientComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
