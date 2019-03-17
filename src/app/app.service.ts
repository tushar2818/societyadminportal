import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AppConstants, CommonMethods, LogAction, LogType, AlertType } from './shared/appconstants';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppService {
  subscription: Subscription;
  public availableLanguages: any = [{ Key: 'English', Value: 'english' }, { Key: 'हिंदी', Value: 'hindi' }, { Key: 'मराठी', Value: 'marathi' }];
  public selectedLanguage: string = "english";
  public UserInfo: any = null;//logged in user information

  constructor(private _http: Http,
    private translate: TranslateService,
    private spinner: NgxSpinnerService) {
  }

  //get transaltion from key
  public getTranslate(skey: string, parameters: any = null) {
    var sResult = "";
    if (skey != "" && skey != null) {
      this.subscription = this.translate.get(skey, parameters).subscribe((val: string) => {
        sResult = val;
      });
    }
    return sResult;
  }

  //get http request options for identoty
  public getRequestOptionsSociety(): RequestOptions {
    let headerStringCity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2,
      'CompanyId': 3
    };
    return new RequestOptions({ headers: new Headers(headerStringCity) })
  }

  //get http request options for identoty
  public getRequestOptionsIdentity(): RequestOptions {
    let headerStringCity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2 
    };
    return new RequestOptions({ headers: new Headers(headerStringCity) })
  }

  //get http request options for city service
  public getRequestOptionsCity(): RequestOptions {
    let headerStringCity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2 
    };
    return new RequestOptions({ headers: new Headers(headerStringCity) })
  }

  //handle exceptions
  public handleExceptions(e) {
    this.spinner.hide();
    CommonMethods.writeLogs(e, AlertType.Error);
  }

  //handle api error
  public handleApiError(e) {
    this.spinner.hide();
    CommonMethods.showMessage(this.getTranslate("Messages.ApiError"), AlertType.Error,
      this.getTranslate("AlertTitle.Error"));
    CommonMethods.writeLogs(e, AlertType.Error);
  }

  //handle api response
  public handleApiResponse(response: any, auditLogType: LogType, auditLogAction: LogAction,
    pageTitleKey: string = null, data: any = null, oldData: any = null, isPredefinedMessage: boolean = false) {

    let successTitle = this.getTranslate(auditLogAction == LogAction.Add ? "AlertTitle.Saved" :
      auditLogAction == LogAction.Update ? "AlertTitle.Updated" : auditLogAction == LogAction.Delete ?
        "AlertTitle.Deleted" : "AlertTitle.Success");

    let errorTitle = this.getTranslate("AlertTitle.Error");

    let successMessage = null;
    if (isPredefinedMessage && pageTitleKey != null) {
      let actionKey = auditLogAction == LogAction.Add ? "Messages.MessageAdded" :
        auditLogAction == LogAction.Update ? "Messages.MessageUpdated" : "Messages.MessageDeleted"
      successMessage = this.getTranslate("MessageFormatter.AddUpdateDeleteSuccessfull",
        { Value1: this.getTranslate(pageTitleKey), Value2: this.getTranslate(actionKey) });
    }

    CommonMethods.handleApiResponse(response, auditLogAction, successTitle, errorTitle, successMessage);

    //keep audit log for success response
    if (response != null && response.IsSuccess) {
      this.keepAuditLogs(auditLogType, auditLogAction, data, oldData);
    }
  }

  //get delete confirmation box settings with titles
  public getDeleteConfirmationSetting(pageTitle: string = null): any {
    let title = pageTitle == null || pageTitle == "" ? this.getTranslate("Messages.YouWantBeAbleToRevert") :
      this.getTranslate("MessageFormatter.YouWantDeleteToThis", { Value1: this.getTranslate(pageTitle) });
    return {
      title: this.getTranslate("Messages.AreYouSure"),
      text: title,
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: this.getTranslate("ActionButton.Delete"),
      cancelButtonText: this.getTranslate("ActionButton.Cancel"),
      buttonsStyling: false
    };
  }

  //keep audit log
  public keepAuditLogs(logType: LogType, logAction: LogAction, data: any = "", oldData: any = "") {
  }

  //api error
  public handleErrorPromise(error: any): Promise<any> {
    return Promise.reject(JSON.stringify(error));
  }

  //change application language
  public changeLanguage() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  //show/hide loading indicator
  public showLoading(show: boolean) {
    if (show) this.spinner.show();
    else this.spinner.hide();
  }

}
