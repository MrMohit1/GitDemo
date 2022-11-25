import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';
import { ProdetailComponent } from './prodetail/prodetail.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AuthGuardService } from './auth-guard.service';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { ContactComponent } from './contact/contact.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductsComponent,
    ProdetailComponent,
    LoginFormComponent,
    AdminComponent,
    RegistrationFormComponent,
    AddproductComponent,
    CartDetailsComponent,
    AdminNavbarComponent,
    UserNavbarComponent,
    ContactComponent,
    PaymentComponent,
    
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
