import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APageComponent } from './a-page/a-page.component';
import { QueryExpriyDateComponent } from './a-page/query-expriy-date/query-expriy-date.component';
import { LogSendComponent } from './a-page/log-send/log-send.component';

const routes: Routes = [
  {
    path: '', component: APageComponent,
    children: [
      { path: '', redirectTo: 'QueryExpiryDate', pathMatch: 'full' },
      { path: 'QueryExpiryDate', component: QueryExpriyDateComponent },
      { path: 'LogSend', component: LogSendComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
