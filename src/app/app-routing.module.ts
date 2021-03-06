import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './shipments/list/list.component';
import { ListCompaniesComponent } from './companies/list-companies/list-companies.component';
import { EditCompanyComponent } from './companies/edit-company/edit-company.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AppBodyComponent,
    children: [
      {
        path: 'shipments',
        component: ListComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]        
      },
      {
        path: 'companies',
        component: ListCompaniesComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]        
      },
      {
        path: 'companies/:id',
        component: EditCompanyComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]        
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
