import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'ngx-notify';

import { ScreenService, BackendService } from '../shared/services';

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
  ) { }

  ngOnInit() {
    this.screen.block = true;
    this.backend.getProducts().subscribe((products: any) => {
      this.products = products;
      this.loadMoreItems();
      this.screen.block = false;
    });
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
    if (total >= this.products.length) {
      this.doneLoading = true;
    }
  }

  handleProductSubmit({ formValues, valid }) {
    console.log('form is ', formValues);
    const { name } = formValues;
    if (valid) {
      this.notify.success('Yey', `Your product ${name} was succesfully uploaded`, { timeout: 3000 });
      this.visibleProductForm = false;
    }
    // this.screen.block = true;
    this.backend.saveProduct({
      ...formValues,
      sku: Math.random().toString(36).substring(7),
      image: `http://testimages.com/${formValues.image}`,
      cart: 'http://be.craftandharvest.com/api/carts/1/'
    })
      .subscribe((res: any) => {
        console.log('response is ', res);
        this.screen.block = false;
      });
  }


}
