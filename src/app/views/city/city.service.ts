import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AppConstants, CommonMethods } from '../../shared/appconstants';
import { AppService } from '../../app.service';

@Injectable()
export class CityService {
  constructor(private _http: Http,
    private appService: AppService) { }
   
  getall(): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_CITY + "city/getall",
      this.appService.getRequestOptionsCity()).pipe(
        map((response: Response) => <any>response.json()),
        catchError(this.appService.handleErrorPromise));
  }

  getById(Id, issaveupdate): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_CITY + "city/getbyid/" + Id + "/" + issaveupdate,
      this.appService.getRequestOptionsCity()).pipe(
        map((response: Response) => <any>response.json()),
        catchError(this.appService.handleErrorPromise));
  }

  save(model): Observable<any> {
    return this._http.post(AppConstants.BASE_API_ENDPOINT_CITY + "city/saveupdate", JSON.stringify(model),
      this.appService.getRequestOptionsCity()).pipe(
        map((response: Response) => <any>response.json()),
        catchError(this.appService.handleErrorPromise));
  }

  delete(Id): Observable<any> {
    return this._http.delete(AppConstants.BASE_API_ENDPOINT_CITY + "city/" + Id ,
      this.appService.getRequestOptionsCity()).pipe(
        map((response: Response) => <any>response.json()),
      catchError(this.appService.handleErrorPromise)); 
  }

}
