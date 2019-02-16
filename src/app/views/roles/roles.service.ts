import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AppConstants, CommonMethods } from '../../shared/appconstants';

@Injectable()
export class RolesService {
  constructor(private _http: Http) { }

  getall(): Observable<any> {
    let options = new RequestOptions({ headers: AppConstants.getHeaderStringIDENTITY() });
    return this._http.get(AppConstants.BASE_API_ENDPOINT_IDENTITY + "/roles/getall", options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleErrorPromise));
  }

  getById(Id): Observable<any> {
    let options = new RequestOptions({ headers: AppConstants.getHeaderStringIDENTITY() });
    return this._http.get(AppConstants.BASE_API_ENDPOINT_IDENTITY + "/roles/getbyid/" + Id, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleErrorPromise));
  }

  post(model): Observable<any> {
    let options = new RequestOptions({ headers: AppConstants.getHeaderStringIDENTITY() });
    let body = JSON.stringify(model);
    return this._http.post(AppConstants.BASE_API_ENDPOINT_IDENTITY + "/roles/saveupdate", body, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleErrorPromise));
  }

  delete(id): Observable<any> {
    let options = new RequestOptions({ headers: AppConstants.getHeaderStringIDENTITY() });
    return this._http.delete(AppConstants.BASE_API_ENDPOINT_IDENTITY + "/roles/" + id, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleErrorPromise));
  }

  protected handleErrorPromise(error: any): Promise<void> {
    return Promise.reject(JSON.parse(error));
  }
}
