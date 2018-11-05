import { Injectable } from '@angular/core';

import { APIService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private api: APIService,
    private http: HttpService, // temporal
    private auth: AuthService,
  ) { }

  getProducts() {
    const url = `https://www.mocky.io/v2/5bc7a43e3200009c0059fbd2`;
    return this.http.getData(url);
  }

  saveProduct(product) {
    const url = `/products/`;
    return this.api.postData(url, product, {
      headers: this.auth.signInRequest()
    });
  }

}
