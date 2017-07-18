import { Response, RequestOptionsArgs, RequestOptions, Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {  } from './http-interceptor.service';
import { debug, CUSTOM_DEFINE } from '../../environments/common';
import { UserService } from '../security/user.service';
import { HttpClientService } from './http-client.service';

@Injectable()
export class KwhttpService {

  constructor(private http: HttpClientService, private UserServ: UserService) { }

  login(data: any): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'username=' + data.username + '&password=' + data.password;
    return this.http.post('/api/login', body, { headers: headers })
      .map((res: Response) => {
        return res;
      }).catch(error => {
        debug.console.log("Login error!!", error);
        alert(error.data.message);
        debug.console.log(error);
        //return Observable.of<any[]>([]);
        this.UserServ.authenticate(undefined);
        return error;
      })
  }

  getUserAuth(bool?: boolean): Observable<any> {
    if (bool === false && this.UserServ.isAuthenticated() && this.UserServ.isIdentityResolved()) {
      return Observable.of(this.UserServ.getIdentity());
    } else {
      return this.http.get('/userauth')
        .map((res: Response) => {
          let body = res.json();  // If response is a JSON use json()
          debug.console.warn('userauth response', body.datas[0]);
          if (body && body.datas[0] !== undefined && body.datas[0].loginType !== undefined) {
            debug.console.warn('userauth response set userauth', body.datas[0]);
            this.UserServ.authenticate({
              loginType: body.datas[0].loginType,
              roles: body.datas[0]
            });
          }
          return this.UserServ.getIdentity();
        }).catch(error => {
          debug.console.log("userauth error!!", error);
          alert(error.data.message);
          this.UserServ.authenticate(undefined);
          return error;
        })
    }
  }
}
