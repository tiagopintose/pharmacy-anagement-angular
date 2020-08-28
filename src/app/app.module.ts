import './vendor.ts';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ToastrModule} from 'ngx-toastr';
import {OrderByPipe} from './shared/pipes/order-by.pipe';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing';

import {JwtInterceptor, ErrorInterceptor} from './shared/helpers';
import { SaleFormComponent, SaleListComponent, SaleResolver, SaleDeleteDialogComponent} from './layouts/sale';
import {LoginComponent} from './layouts/login';
import {ProductResolver, ProductFormComponent, ProductListComponent, ProductDeleteDialogComponent} from './layouts/product';
import {ClientDeleteDialogComponent, ClientFormComponent, ClientListComponent, ClientResolver} from '@/layouts/client';

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
  ],
  declarations: [
      AppComponent,
      OrderByPipe,
      LoginComponent,
      ProductListComponent,
      ProductFormComponent,
      ProductDeleteDialogComponent,
      ClientListComponent,
      ClientFormComponent,
      ClientDeleteDialogComponent,
      SaleListComponent,
      SaleFormComponent,
      SaleDeleteDialogComponent,
  ],
  entryComponents: [ProductListComponent, ProductFormComponent, ProductDeleteDialogComponent, ClientListComponent, ClientFormComponent, ClientDeleteDialogComponent, SaleListComponent, SaleFormComponent, SaleDeleteDialogComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ProductResolver,
      ClientResolver,
      SaleResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
