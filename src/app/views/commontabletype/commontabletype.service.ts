import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../shared/appconstants';
import { GlobalService } from '../../shared/global.service';

@Injectable()
export class CommonTableTypeService {
  constructor(private _http: Http,
    private globalService: GlobalService) { }

  //get all records
  getall(): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_SOCIETY + "commontabletype/getall", this.globalService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  //get record by id
  getById(Id): Observable<any> {
    return this._http.get(AppConstants.BASE_API_ENDPOINT_SOCIETY + "commontabletype/getbyid/" + Id, this.globalService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  //save/update
  save(model): Observable<any> {
    let body = JSON.stringify(model);
    return this._http.post(AppConstants.BASE_API_ENDPOINT_SOCIETY + "commontabletype/saveupdate", body, this.globalService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  }

  //delete record
  delete(id): Observable<any> {
    return this._http.delete(AppConstants.BASE_API_ENDPOINT_SOCIETY + "commontabletype/" + id, this.globalService.getRequestOptionsSociety()).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.globalService.handleErrorPromise));
  } 
}
