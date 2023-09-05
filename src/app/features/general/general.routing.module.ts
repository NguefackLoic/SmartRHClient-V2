import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from 'src/app/shared/partials/auth/auth.component';
import { ContainerComponent } from 'src/app/shared/partials/container/container.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { CategoriesComponent } from './categories/categories.component';
import { CentreComponent } from './centre/centre.component';
import { DepartementComponent } from './departement/departement.component';
import { EchelonComponent } from './echelon/echelon.component';
import { EmployeComponent } from './employe/employe.component';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { PosteComponent } from './poste/poste.component';

const routes: Routes = [
    { path: 'auth/container/general', redirectTo: '/auth/container/client', pathMatch: 'full' },
    {
        path: 'auth', component: AuthComponent, children: [
            {
                path: 'container', component: ContainerComponent, children: [
                    { path: 'employe', component: EmployeComponent },
                    { path: 'category', component: CategoriesComponent },
                    { path: 'echelon', component: EchelonComponent },
                    { path: 'gestion-user', component: GestionUserComponent },
                    { path: 'centre', component: CentreComponent },
                    { path: 'departement', component: DepartementComponent},
                    { path: 'poste', component: PosteComponent},
                    { path: 'add-employe', component: AddEmployeComponent}
                ]
            }
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [
        RouterModule
    ]
})

export class GeneralRoutingModule { }
