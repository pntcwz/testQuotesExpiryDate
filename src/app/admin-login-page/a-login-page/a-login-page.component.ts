import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { Md5 } from 'ts-md5/dist/md5';
import { KwhttpService } from "app/service/kwhttp.service";
import { debug } from "environments/common";
import { UserService } from "app/security/user.service";

@Component({
  selector: 'app-a-login-page',
  templateUrl: './a-login-page.component.html',
  styleUrls: ['./a-login-page.component.css']
})
export class ALoginPageComponent implements OnInit {

  form: FormGroup;
  data: any;

  constructor(
    private kwhttp: KwhttpService,
    private fb: FormBuilder,
    private md5: Md5,
    private router: Router,
    private UserServ: UserService
  ) { }

  ngOnInit() {
    // 定義驗證方式
    this.form = this.fb.group({
      'username': ['21261213', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'password': ['1234', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  onSubmit(form: FormGroup) {
    debug.console.log('login');
    debug.console.log('valid:', form.valid, 'value:', form.value.username);

    if (form.valid == false) {
      alert('請正確填寫欄位');
      return;
    }

    const tomd5: boolean = true;

    this.md5 = new Md5;
    const passTomd5 = this.md5.appendStr(form.value.password).end().toString();
    const sendPassword = btoa(((true) ? passTomd5 : form.value.password));

    debug.console.log('login', passTomd5, passTomd5, btoa(passTomd5));

    this.kwhttp.login({ username: form.value.username, password: sendPassword })
      .subscribe(success => {
        debug.console.log('Login Success response!!', success);
        this.kwhttp.getUserAuth(true)
          .subscribe(success => {
            debug.console.log('getUserAuth Success response!!', success);

            if (this.UserServ.isInLoginType('Admin')) {
              this.router.navigate(['/', 'AdminPage']);
            } else if (this.UserServ.isInLoginType('User')) {
              alert("請輸入管理者帳號");
            } else {
              alert("用戶權限錯誤");
            }
          });
      });
  }
}
