import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProdetailComponent } from './prodetail/prodetail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { ContactComponent } from './contact/contact.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {path:'homepage',component:HomepageComponent},
  {path:'products',component:ProductsComponent},
  {path:'prodetail/:_id',component:ProdetailComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuardGuard]},
  {path:'login-form',component:LoginFormComponent},
  {path:'register',component:RegistrationFormComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'cartdetails',component:CartDetailsComponent},
  {path:'contact',component:ContactComponent},
  {path:'payment',component:PaymentComponent},
  {path:'**',redirectTo:'login-form'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
