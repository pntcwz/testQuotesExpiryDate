import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLoginPageRoutingModule } from './admin-login-page-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KwhttpService } from '../service/kwhttp.service';
import { Md5 } from 'ts-md5/dist/md5';
import { ALoginPageComponent } from "app/admin-login-page/a-login-page/a-login-page.component";

@NgModule({
  imports: [
    CommonModule,
    AdminLoginPageRoutingModule,
    //BrowserModule,
    CommonModule ,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [

    ALoginPageComponent
  ],
  providers: [KwhttpService, Md5]
})
export class AdminLoginPageModule { }
