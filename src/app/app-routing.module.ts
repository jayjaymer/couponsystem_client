import { AuthGuard } from './auth.guard';
import { CustomerComponent } from './pages/customer/customer.component';
import { CompanyComponent } from './pages/company/company.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { InfoCustomerComponent } from './components/info-customer/info-customer.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent,canActivate: [AuthGuard]},
  {path:'company',component:CompanyComponent,canActivate: [AuthGuard]},
  {path:'customer',component:CustomerComponent,canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'updateCustomer',component:UpdateCustomerComponent},
  {path: 'getOneCustomer',component:InfoCustomerComponent},
  {path:'',component:HomeComponent , pathMatch: 'full'},
  {path:'**',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
