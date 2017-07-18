import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { SetUserComponent } from './set-user/set-user.component';
import { LoginGuard } from './security/login.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'ALoginPage', pathMatch: 'full' },
      { path: 'ALoginPage', loadChildren: './admin-login-page/admin-login-page.module#AdminLoginPageModule' },
      {
        path: 'AdminPage', loadChildren: './admin-page/admin-page.module#AdminPageModule',
        canActivate: [LoginGuard], data: { loginType: ['Admin'] }
      }
    ]
  },
  { path: 'setUser', component: SetUserComponent },
  { path: 'login', redirectTo: 'ALoginPage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
