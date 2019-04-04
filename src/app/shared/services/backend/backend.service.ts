import { Injectable } from '@angular/core';

import { APIService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';

import {Observable, Subject, from, forkJoin} from 'rxjs';
import {tap, mergeMap} from 'rxjs/operators';
import { NotifyService } from 'ngx-notify';

const api = require('../../../../config/api.json');

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private api: APIService,
    private http: HttpService, // temporal
    private auth: AuthService,
    private notify: NotifyService,
  ) { }


  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getProducts() {
    const url = `${api.url}/products/`;
    return this.http.getData(url);
  }

  getProductsImage() {
    const url = `${api.url}/product_images/`;
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

  removeProduct(id) {
    const productId = id;
    const url = `/products/${id}`;


    return this.getProductImages().subscribe((imageDataArr:any) => {

      const productImages = imageDataArr.filter(imageDataObj => {
        return imageDataObj.product.url.match(/.*\/(.*)\//)[1] === productId
      });

      const productImageIds = productImages.map(image => {
        return image.id;
      });


      if (productImageIds.length > 0) {
        const deleteProductDataResponse = this.api.deleteData(url, {
          headers: this.auth.signInRequest()
        });

        const deleteProductImagesResponse = this.removeProductImages(productImageIds);


        return forkJoin([deleteProductDataResponse, deleteProductImagesResponse]).pipe(
          tap(() => {
            this._refreshNeeded$.next();
          })
        ).subscribe(([res, res2]) => {
          this.notify.success(`Done`, `Product successfully deleted`, { timeout: 3000 });
        })

      } else {
        return this.api.deleteData(url, {
          headers: this.auth.signInRequest()
        }).pipe(
          tap(() => {
            this._refreshNeeded$.next();
          })
        ).subscribe((res: any) => {
          const { status } = res;
          if (status === 204) {
            this.notify.success(`Done`, `Product successfully deleted`, { timeout: 3000 });
          }
        });
      }

    });

  }

  getProductImages() {
    const url = `${api.url}/product_images/`;
    return this.http.getData(url);
  }

  removeProductImages(arrIds) {
    const imageIds = from(arrIds);

    return imageIds.pipe(
      mergeMap(id => this.api.deleteData(`/product_images/${id}/`, {
        headers: this.auth.signInRequest()
      }))
    );

  }

}
