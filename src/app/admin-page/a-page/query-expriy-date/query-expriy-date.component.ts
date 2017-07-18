import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../service/http-client.service';
import { MomentModule } from 'angular2-moment';
import * as alaSQLSpace from 'alasql';
import * as moment from 'moment';

@Component({
  selector: 'app-query-expriy-date',
  templateUrl: './query-expriy-date.component.html',
  styleUrls: ['./query-expriy-date.component.css']
})
export class QueryExpriyDateComponent implements OnInit {

  startdate = moment().toDate();
  enddate = moment().add(7, 'days').toDate();
  list: any;

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    console.log(moment().toDate());
    console.log('test');
    this.getQuotesExpiryDate();
  }

  getQuotesExpiryDate() {
    let sdate = moment(this.startdate).format('YYYY-MM-DD');
    let edate = moment(this.enddate).format('YYYY-MM-DD');
    let param = "?startdate=" + sdate + "&enddate=" + edate;
    this.httpClient.get('/admin/queryExpiryDate' + param)
      .subscribe((success: Response) => {
        let body = success.json();
        console.log('getQuotesExpiryDate', body.datas);
        this.list = body.datas;
      });
  }

  exportData() {
    console.log('exportData');
    let sdate = moment(this.startdate).format('YYYY-MM-DD');
    let edate = moment(this.enddate).format('YYYY-MM-DD');
    let param = "?startdate=" + sdate + "&enddate=" + edate;
    this.httpClient.get('/admin/queryExpiryDate' + param)
      .subscribe((success: Response) => {
        let body = success.json();
        console.log('getQuotesExpiryDate', body.datas);
        this.list = body.datas;

        let filename = sdate + " " + edate;
        let strsql = "";
        strsql += 'SELECT';
        strsql += '	User_Type as [會員類別]';
        strsql += '	, IIF(vtype != "null", vtype ,"") as [付費會員]';
        strsql += '	, User_ID as [身份證字號]';
        strsql += '	, Name as [客戶姓名]';
        strsql += '	, Cube_ID as [資傳帳號]';
        strsql += '	, Start_Date as [資傳開始日]';
        strsql += '	, End_Date as [資傳到期日]';

        strsql += '	, IIF(CubeType != "null", CubeType ,"") as [預約展期別]';
        strsql += '	, IIF(SDate != "null", SDate ,"") as [預約單展期起始日]';
        strsql += '	, IIF(EDate != "null", EDate ,"") as [預約單展期到到期日]';

        strsql += '	, (IIF(Home_Zone_Number != "","("+Home_Zone_Number+")","") + Home_Number) as [電話]';
        strsql += '	, Cellphone as [手機]';
        strsql += '	, Email as [Email]';
        strsql += 'INTO XLSX("' + filename + '.xlsx",{headers:true}) FROM ?';
        alasql(strsql, [this.list]);
      });

  }
}
