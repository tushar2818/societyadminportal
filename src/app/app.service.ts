import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AppConstants, CommonMethods, LogAction, LogType } from './shared/appconstants';

@Injectable()
export class AppService {
  constructor(private _http: Http) { }

  keepAuditLog(logType: LogType, logAction: LogAction, data: any = "", oldData: any = ""): Observable<any> {
    let options = new RequestOptions({ headers: AppConstants.getHeaderStringAuditLog() });
    return null;
  }

  protected handleErrorPromise(error: any): Promise<void> {
    return Promise.reject(JSON.parse(error));
  }
}
