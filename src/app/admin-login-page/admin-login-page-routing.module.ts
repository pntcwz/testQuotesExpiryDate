import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ALoginPageComponent } from "app/admin-login-page/a-login-page/a-login-page.component";

const routes: Routes = [
    // {path: '', redirectTo: 'ALoginPage', pathMatch: 'full'},
    // {path: 'ALoginPage', component: ALoginPageComponent},
    {path: '', component: ALoginPageComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLoginPageRoutingModule { }
