import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: InscriptionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home-admin', component: HomeAdminComponent }



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
