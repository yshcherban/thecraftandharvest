import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../config/config.service';
import { HttpService } from '../http/http.service';

@Injectable()
export class APIService extends HttpService {

  private baseURL: string;

  constructor(
    public http: Http
  ) {
    super(http);
    this.baseURL = `${ConfigService.apiHost}`;
    // this.baseURL = `http://www.mocky.io/v2`;
  }

  getData(path, params = {}): Observable<Response> {
    return super.getData(`${this.baseURL}${path}`, params);
  }

  postData(path, payload, options = null): Observable<Response> {
    return super.postData(`${this.baseURL}${path}`, payload, options);
  }

  putData(path, payload, options = null): Observable<Response> {
    return super.putData(`${this.baseURL}${path}`, payload, options);
  }

  deleteData(path, options = null): Observable<Response> {
    return super.deleteData(`${this.baseURL}${path}`, options);
  }

  patchData(path, payload): Observable<Response> {
    return super.patchData(`${this.baseURL}${path}`, payload);
  }

  extractResponse(res: any) {
    const body = !!res._body ? JSON.parse(res['_body']) : null;
    return { ...res, body };
  }

}
