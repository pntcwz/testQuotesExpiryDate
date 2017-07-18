import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { APageComponent } from './a-page/a-page.component';
import { QueryExpriyDateComponent } from './a-page/query-expriy-date/query-expriy-date.component';
import { LogSendComponent } from './a-page/log-send/log-send.component';
import { ASlideNavComponent } from './a-page/a-slide-nav/a-slide-nav.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    MomentModule
  ],
  declarations: [APageComponent, QueryExpriyDateComponent, LogSendComponent, ASlideNavComponent]
})
export class AdminPageModule { }
