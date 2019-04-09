import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AppConstants, CommonMethods } from '../../shared/appconstants';
import { GlobalService } from '../../shared/global.service';

@Injectable()
export class CityService {
  constructor(private _http: Http,
    private globalService: GlobalService) { }
   
  getall(): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_CITY + "city/getall",
      this.globalService.getRequestOptionsCity()).pipe(
        map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  getById(Id, issaveupdate): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_CITY + "city/getbyid/" + Id + "/" + issaveupdate,
      this.globalService.getRequestOptionsCity()).pipe(
        map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  save(model): Observable<any> {
    return this._http.post(AppConstants.BASE_API_ENDPOINT_CITY + "city/saveupdate", JSON.stringify(model),
      this.globalService.getRequestOptionsCity()).pipe(
        map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  delete(Id): Observable<any> {
    return this._http.delete(AppConstants.BASE_API_ENDPOINT_CITY + "city/" + Id ,
      this.globalService.getRequestOptionsCity()).pipe(
        map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise)); 
  }

}
