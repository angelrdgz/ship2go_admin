import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DataTableModule} from "angular-6-datatable";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { ToastService } from './services/toast.service';

import { LoginComponent } from './auth/login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { LoaderService } from './services/loader.service';

import { AppHeaderComponent } from './layouts/app-header/app-header.component';
import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { AppAsideComponent } from './layouts/app-aside/app-aside.component';
import { AppContainerComponent } from './layouts/app-container/app-container.component';
import { AppLoaderComponent } from './layouts/app-loader/app-loader.component';

import { ListComponent } from './shipments/list/list.component';
import { ListCompaniesComponent } from './companies/list-companies/list-companies.component';
import { EditCompanyComponent } from './companies/edit-company/edit-company.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    AppBodyComponent,
    AppAsideComponent,
    AppContainerComponent,
    AppLoaderComponent,
    ListComponent,
    ListCompaniesComponent,
    EditCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    DataTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ApiService,
    ToastService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
