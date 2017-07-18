import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdToolbarModule, MdButtonModule, MdInputModule } from '@angular/material';
import 'hammerjs';
import { SetUserComponent } from './set-user/set-user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginGuard } from './security/login.guard';
import { UserService } from './security/user.service';
import { HttpModule, ConnectionBackend, XHRBackend, RequestOptions } from '@angular/http';
import { KwhttpService } from './service/kwhttp.service';
import { debug } from '../environments/common';
import { HttpClientService } from './service/http-client.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SetUserComponent
  ],
  imports: [
    // MaterialModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [LoginGuard, UserService, KwhttpService, HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
