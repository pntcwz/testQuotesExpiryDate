import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { KwhttpService } from '../service/kwhttp.service';
import { debug, CUSTOM_DEFINE } from '../../environments/common';

@Injectable()
export class UserService {
  private _identity = undefined;
  private _authenticated: boolean = false;

  private loginStream = new Subject();

  constructor() {
    let KwID = localStorage.getItem(CUSTOM_DEFINE.KwIdentity);
    if (KwID !== 'null' && KwID !== 'undefined') {
      let jKwID = JSON.parse(KwID);
      this.authenticate(jKwID);
    }
    this.loginStream.subscribe((val: boolean) => {
      debug.console.log('loginStream', val);
      this._authenticated = val;
    });
  }

  setTokenStorage(xAuthToken: string) {
    localStorage.setItem(CUSTOM_DEFINE.HeaderAuth, xAuthToken);
  }

  getTokenStorage() {
    return localStorage.getItem(CUSTOM_DEFINE.HeaderAuth);
  }


  authenticate(identity) {
    debug.console.log("set identity", identity);
    this._identity = identity;
    this._authenticated = identity != undefined;
    localStorage.setItem(CUSTOM_DEFINE.KwIdentity, JSON.stringify(this._identity));

    this.setLoginStatus(this.isAuthenticated());
  };

  private setLoginStatus(bool: boolean) {
    this.loginStream.next(bool);
  }

  getLoginStatus() {
    return this._authenticated;
  }

  isIdentityResolved() {
    return (this._identity === undefined);
  }

  getIdentity() {
    return this._identity;
  };

  isAuthenticated() {
    return this._authenticated;
  };
  //檢查是哪種客戶
  isInLoginType(auth) {
    debug.console.log('isInLoginType', this._identity);
    if (!this._authenticated || !this._identity || !this._identity.loginType) return false;
    return this._identity.loginType.indexOf(auth) != -1;
  };
  isInAdminType(role) {
    if (!this._authenticated || !this._identity || !this._identity.adminType) return false;
    return this._identity.adminType.indexOf(role) != -1;
  };
  isInAnyAdminType(roles) {
    if (!this._authenticated || !this._identity || !this._identity.adminType) return false;
    for (var i = 0; i < roles.length; i++) {
      if (this.isInAdminType(roles[i])) return true;
    }
    return false;
  };

}
