import { Component, OnInit } from '@angular/core';
import { UserService } from '../security/user.service';
import { debug } from '../../environments/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private userServ: UserService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    debug.console.log('HeaderComponent ngDoCheck');
    this.loggedIn = this.userServ.getLoginStatus();
  }

  logout() {
    debug.console.log('logout');
    this.userServ.authenticate(undefined);
    // TODO
  }

  toggleDisplay() {
    if (this.userServ.isAuthenticated()) {
      this.userServ.authenticate(undefined);
    } else {
      this.userServ.authenticate({
        loginType: 'Admin',
        roles: '[ROLE_ADMIN]'
      });
    }
  }

}
