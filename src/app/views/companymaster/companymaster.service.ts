import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AppConstants, CommonMethods } from '../../shared/appconstants';
import { GlobalService } from '../../shared/global.service';

@Injectable()
export class CompanyMasterService {
  constructor(private _http: Http,
    private globalService: GlobalService) { }

  //get all records
  getall(): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_SOCIETY + "companymaster/getall", this.globalService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  //get record by id
  getById(Id): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_SOCIETY + "companymaster/getbyid/" + Id, this.globalService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  //save/update
  save(model): Observable<any> {
    let body = JSON.stringify(model);
    return this._http.post(AppConstants.BASE_API_ENDPOINT_SOCIETY + "companymaster/saveupdate", body, this.globalService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  //delete record
  delete(id): Observable<any> {
    return this._http.delete(AppConstants.BASE_API_ENDPOINT_SOCIETY + "companymaster/" + id, this.globalService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  } 
}
