import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { KwhttpService } from '../service/kwhttp.service';
import { debug } from '../../environments/common';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private kwhttp: KwhttpService, private UserServ: UserService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let loginType = next.data.loginType || undefined;
    return this.kwhttp.getUserAuth(false).map(success => {
      debug.console.log("LoginGuard getUserAuth success!!", success);
      debug.console.log("LoginGuard getUserAuth success set identity", this.UserServ.getIdentity());
      return this.checkLoginType(loginType);
    }
    ).catch(error => {
      debug.console.warn("LoginGuard getUserAuth error", error);
      this.router.navigateByUrl('');
      return Observable.of(false);
    });
  }

  private checkLoginType(loginType) {
    if (this.UserServ.isAuthenticated() && this.UserServ.isInLoginType(loginType)) {
      debug.console.log('checkLoginType ok');
      return true;
    } else if (this.UserServ.isAuthenticated()) {
      // TODO 權限不足
      debug.console.log('checkLoginType 權限不足');
      this.router.navigateByUrl('');
      return false;
    } else {
      debug.console.log('checkLoginType not Login');
      this.router.navigateByUrl('');
      return false;
    }
  }
}
