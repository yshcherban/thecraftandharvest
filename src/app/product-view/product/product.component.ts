import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: any;

  images = [];

  constructor() {}

  ngOnInit() {}

  get name() {
    return this.product.name;
  }

  get description() {
    return this.product.description;
  }

  get shortDescription() {
    const len = this.product.description.length;
    return this.product.description.substr(1, 120 || len);
  }

  get categories() {
    return this.product.categories;
  }

  get picture() {
    return this.product.picture;
  }

  get price() {
    return this.product.price;
  }

  get tags() {
    return this.product.tags;
  }
}
