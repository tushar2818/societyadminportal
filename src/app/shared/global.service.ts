import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs'; 
import { AppConstants, CommonMethods, LogAction, LogType, AlertType, LookupType } from './appconstants';
import { LookupTypeModel } from './models';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class GlobalService {

  subscription: Subscription;
  public availableLanguages: any = [{ Key: 'English', Value: 'english' }, { Key: 'हिंदी', Value: 'hindi' }, { Key: 'मराठी', Value: 'marathi' }];
  public selectedLanguage: string = "english";
  public dateFormat = AppConstants.DATE_FORMAT;
  public dateFormatPipe = AppConstants.DATE_FORMAT_PIPE;
  public timeFormat = AppConstants.TIME_FORMAT;

  constructor(private _http: Http,
    private translate: TranslateService,
    private ngxSpinnerService: NgxSpinnerService) {
    this.dateFormat = AppConstants.DATE_FORMAT;
    this.dateFormatPipe = AppConstants.DATE_FORMAT_PIPE;
    this.timeFormat = AppConstants.TIME_FORMAT;
  }

  //get http request options for identoty
  public getRequestOptionsSociety(): RequestOptions {
    let headerStringCity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2,
      'UserID': AppConstants.UserID, 
      'CompanyId': 3
    };
    return new RequestOptions({ headers: new Headers(headerStringCity) })
  }

  //get http request options for identoty
  public getRequestOptionsIdentity(): RequestOptions {
    let headerStringCity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2,
      'UserID': AppConstants.UserID, 
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

  //change application language
  public changeLanguage() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  //show/hide loading indicator
  public showLoading(show: boolean) {
    if (show) this.ngxSpinnerService.show();
    else this.ngxSpinnerService.hide();
  }

  //get all lookups
  getallLookups(lookupType: any): Observable<any> {
    let lookupTypeModels: any = [];
    for (let lookup of lookupType) {
      lookupTypeModels.push({ LookupType: lookup });
    }
    let body = JSON.stringify(lookupTypeModels);
    return this._http.post(AppConstants.BASE_API_ENDPOINT_SOCIETY + "lookup/getlookups", body,
      this.getRequestOptionsSociety()).pipe(
        map((response: Response) => <any>response.json()),
        catchError(this.handleErrorPromise));
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

  

  //handle exceptions
  public handleExceptions(e) {
    this.showLoading(false);
    CommonMethods.writeLogs(e, AlertType.Error);
  }

  //handle api error
  public handleApiError(e) {
    this.showLoading(false);
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
  public getConfirmationSetting(pageTitle: string = null, logAction: LogAction = LogAction.Delete): any {

    let title = '';
    let confirmText = '';

    switch (logAction) {
      case LogAction.Delete:
        title = pageTitle == null || pageTitle == "" ? this.getTranslate("Messages.YouWantBeAbleToRevert") :
          this.getTranslate("MessageFormatter.YouWantDeleteToThis", { Value1: this.getTranslate(pageTitle) });
        confirmText = this.getTranslate("ActionButton.Delete");
        break;
      case LogAction.Save:
        title = pageTitle == null || pageTitle == "" ? this.getTranslate("Messages.DoYouWantToSaveRecord") :
          this.getTranslate("MessageFormatter.DoYouWantToSaveRecord", { Value1: this.getTranslate(pageTitle) });
        confirmText = this.getTranslate("ActionButton.Save");
        break;
      default:
        break;
    }


    return {
      title: this.getTranslate("Messages.AreYouSure"),
      text: title,
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: confirmText,
      cancelButtonText: this.getTranslate("ActionButton.Cancel"),
    };
  }

  //keep audit log
  public keepAuditLogs(logType: LogType, logAction: LogAction, data: any = "", oldData: any = "") {
  }

  //api error
  public handleErrorPromise(error: any): Promise<any> {
    return Promise.reject(JSON.stringify(error));
  }

  //validate user
  public validateUser(model: any): Observable<any> {
    let body = JSON.stringify(model);
    return this._http.post(AppConstants.BASE_API_ENDPOINT_IDENTITY + "identity/validateuser", body,
      this.getRequestOptionsIdentity()).pipe(
        map((response: Response) => <any>response.json()),
        catchError(this.handleErrorPromise));
  }

  public saveUpdateUser(model: any): Observable<any> {
    let body = JSON.stringify(model);
    return this._http.post(AppConstants.BASE_API_ENDPOINT_IDENTITY + "user/saveupdate", body,
      this.getRequestOptionsIdentity()).pipe(
        map((response: Response) => <any>response.json()),
        catchError(this.handleErrorPromise));
  }

  //clear user data
  public clearUserData() {
    AppConstants.IsUserLoggedIn = false;
    AppConstants.UserID = '';
    AppConstants.UserRole = '';
    AppConstants.ClientID = 0;
    AppConstants.CompanyID = 0;
    localStorage.removeItem(AppConstants.UserDetailsKeyword);
    localStorage.clear();
  }

  //check whether the user is logged in or not
  public setUserData(): boolean {
    try {
      let userDetails = localStorage.getItem(AppConstants.UserDetailsKeyword)
      if (userDetails != null) {
        let userData = JSON.parse(userDetails);
        AppConstants.UserID = userData.ApplicationUserDTO.Id;
        AppConstants.UserRole = userData.Roles[0];
        AppConstants.IsUserLoggedIn = true;
        return true;
      }
      else {
        this.clearUserData();
        return false;
      }
    } catch (e) {
      this.handleExceptions(e);
    }
    return false;
  }

  //get logged in user data
  public getUserData() {
    try {
      let userDetails = localStorage.getItem(AppConstants.UserDetailsKeyword)
      if (userDetails != null)
        return JSON.parse(userDetails);
    } catch (e) {
      this.handleExceptions(e);
    }
    return null;
  } 

}
