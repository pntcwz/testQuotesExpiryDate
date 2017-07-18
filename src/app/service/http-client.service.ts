import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/security/user.service';
import { CUSTOM_DEFINE } from '../../environments/common';
import { debug } from 'environments/common';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptionsArgs, RequestOptions } from '@angular/http';

@Injectable()
export class HttpClientService {

  status = {
    "status.400": "錯誤的請求。由於語法錯誤，該請求無法完成。",
    "status.401": "未經授權。伺服器拒絕回應。",
    "status.403": "已禁止。伺服器拒絕回應。",
    "status.404": "未找到。無法找到請求的位置。",
    "status.405": "方法不被允許。使用該位置不支持的請求方法進行了請求。",
    "status.406": "不可接受。伺服器只生成用戶端不接受的回應。",
    "status.407": "需要代理身份驗證。用戶端必須先使用代理對自身進行身份驗證。",
    "status.408": "請求超時。等待請求的伺服器超時。",
    "status.409": "衝突。由於請求中的衝突，無法完成該請求。",
    "status.410": "過期。請求頁不再可用。",
    "status.411": "長度必需。未定義“內容長度”。",
    "status.412": "前提條件不滿足。請求中給定的前提條件由伺服器評估為 false。",
    "status.413": "請求實體太大。伺服器不會接受請求，因為請求實體太大。",
    "status.414": "請求 URI 太長。伺服器不會接受該請求，因為 URL 太長。",
    "status.415": "不支援的媒體類型。伺服器不會接受該請求，因為媒體類型不受支持。",
    "status.416": "HTTP 狀態碼 {0}",
    "status.500": "內部伺服器錯誤。",
    "status.501": "未實現。伺服器不識別該請求方法，或者伺服器沒有能力完成請求。",
    "status.503": "服務不可用。伺服器當前不可用(超載或故障)。"
  };

  constructor(private http: Http, private userServ: UserService) { }

  private intercept(observable: Observable<Response>) {
    return observable
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.beforeRequest();
    return this.intercept(this.http.get(url, this.requestOptions(options)));
  }
  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    this.beforeRequest();
    return this.intercept(this.http.post(url, body, this.requestOptions(options)));
  }
  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    this.beforeRequest();
    return this.intercept(this.http.put(url, body, this.requestOptions(options)));
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.beforeRequest();
    return this.intercept(this.http.put(url, this.requestOptions(options)));
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('XAuthToken', this.userServ.getTokenStorage());
  }

  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      // let headers = new Headers();
      // options.headers = headers;
      options.headers = new Headers();
    }
    options.headers.append('XAuthToken', this.userServ.getTokenStorage());
    return options;
  }

  /**
   * Before any Request.
   */
  private beforeRequest(): void {
    // this.notifyService.showPreloader();
  }

  /**
   * After any request.
   */
  private afterRequest(): void {
    // this.notifyService.hidePreloader();
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message

    if (error.status < 200 || error.status >= 300) {
      alert('網路錯誤:' + error.status + ' - ' + this.status['status.' + error.status]);
    }

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    debug.console.error(errMsg); // log to console instead

    // this.notifyService.popError();
    return Observable.throw(error);
  }

  /**
   * onSuccess
   * @param res
   */
  private onSuccess(res: Response): void {
    // debug.console.log(res);
    const xAuthToken = res.headers.get(CUSTOM_DEFINE.SetHeaderAuth);
    if (xAuthToken != null && xAuthToken != undefined) {
      this.userServ.setTokenStorage(xAuthToken);
    }
  }

  /**
   * onError
   * @param error
   */
  private onError(error: any): void {
    debug.console.warn(error);
    // this.notifyService.popError();
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    this.afterRequest();
  }
}
