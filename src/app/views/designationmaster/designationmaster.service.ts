import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AppConstants, CommonMethods } from '../../shared/appconstants';
import { AppService } from '../../app.service';

@Injectable()
export class DesignationMasterService {
  constructor(private _http: Http,
    private appService: AppService) { }

  //get all records
  getall(): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_SOCIETY + "designationmaster/getall", this.appService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.appService.handleErrorPromise));
  }

  //get record by id
  getById(Id): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_SOCIETY + "designationmaster/getbyid/" + Id, this.appService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.appService.handleErrorPromise));
  }

  //save/update
  save(model): Observable<any> {
    let body = JSON.stringify(model);
    return this._http.post(AppConstants.BASE_API_ENDPOINT_SOCIETY + "designationmaster/saveupdate", body, this.appService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.appService.handleErrorPromise));
  }

  //delete record
  delete(id): Observable<any> {
    return this._http.delete(AppConstants.BASE_API_ENDPOINT_SOCIETY + "designationmaster/" + id, this.appService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.appService.handleErrorPromise));
  } 
}
