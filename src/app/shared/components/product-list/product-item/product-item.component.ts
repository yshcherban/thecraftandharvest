import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;

  constructor() {}

  ngOnInit() {}

  get id() {
    return this.product._id || this.product.id;
  }

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
    return this.formatString(this.product.product_tag);
  }

  formatString(string) {
    return string.toString().replace(/\s/g, '')
      .split(',').join(', ').replace(/P-/g,'');
  }

  get discountPorcentage() {
    const regularPrice = parseInt(this.product.regular_price, 0);
    const salePrice = parseInt(this.product.sale_price, 0);

    return Math.round((regularPrice - salePrice) / regularPrice * 100 || 0);
  }

}
