import { Injectable } from '@angular/core';

import { APIService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';

import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

const api = require('../../../../config/api.json');

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private api: APIService,
    private http: HttpService, // temporal
    private auth: AuthService,
  ) { }


  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getProducts() {
    const url = `${api.url}/products/`;
    return this.http.getData(url);
  }

  saveProduct(product) {
    const url = `/products/`;
    return this.api.postData(url, product, {
      headers: this.auth.signInRequest()
    }).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

}
