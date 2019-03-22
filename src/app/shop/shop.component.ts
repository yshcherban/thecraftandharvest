import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'ngx-notify';

import { AuthService, ScreenService, BackendService } from '../shared/services';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  loadedProducts: any[] = [];
  visibleProductForm = false;
  totalItems = 10;
  currentIndex = 0;
  lastIndex = 10;
  doneLoading = false;

  constructor(
    private screen: ScreenService,
    private notify: NotifyService,
    private backend: BackendService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.screen.block = true;
    this.backend.refreshNeeded$
      .subscribe(() => {
        this.getListOfProducts();
      });

    this.getListOfProducts();
  }

  private getListOfProducts() {
    this.backend.getProducts().subscribe((products: any) => {
      this.products = products;
      this.initialCountOfProducts();
      this.screen.block = false;
    });
  }

  private initialCountOfProducts() {
    const portion = this.products.slice(0, 10);

    this.loadedProducts = [
      ...portion
    ];

    this.currentIndex = 10;
  }

  get checkIsAdmin() {
    if(this.auth.user) {
      return this.auth.user.is_admin ? true : false;
    }

    return false;
  }

  showProductForm() {
    this.visibleProductForm = true;
  }


  loadMoreItems() {
    const total = this.totalItems + this.currentIndex;
    const portion = this.products.slice(this.currentIndex, total);

    this.loadedProducts = [
      ...this.loadedProducts,
      ...portion
    ];

    this.currentIndex = this.currentIndex + this.totalItems;
    if (total > this.products.length) {
      this.doneLoading = true;
    }
  }

}
