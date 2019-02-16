import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AppConstants, CommonMethods, LogAction, LogType, AlertType} from './shared/appconstants';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppService {
  subscription: Subscription;
  public availableLanguages: any = [{ Key: 'English', Value: 'english' }, { Key: 'मराठी', Value: 'marathi' }];
  public selectedLanguage: string = "english";

  constructor(private _http: Http,
    private translate: TranslateService,
    private spinner: NgxSpinnerService) { }

  keepAuditLog(logType: LogType, logAction: LogAction, data: any = "", oldData: any = ""): Observable<any> {
    let options = new RequestOptions({ headers: AppConstants.getHeaderStringAuditLog() });
    return null;
  }

  changeLanguage() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  getTranslate(skey: string) {
    var sResult = skey;
    try {
      if (skey != "" && skey != null) {
        this.subscription = this.translate.get(skey).subscribe((val: string) => {
          sResult = val;
        });
      }
    } catch (e) {
    }
    return sResult;
  }

  handleExceptions(e, alertType: AlertType = AlertType.Error) {
    CommonMethods.writeLogs(alertType, e);
    this.spinner.hide();
  }

  handleApiError() {
    CommonMethods.showMessage(this.getTranslate('Messages.ApiError'), AlertType.Error,
      this.getTranslate('AlertTitle.Error'));
    this.spinner.hide();
  }

  protected handleErrorPromise(error: any): Promise<void> {
    return Promise.reject(JSON.parse(error));
  }
}
