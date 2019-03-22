import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() products: any[];
  @ViewChild('grid') grid: any;

  visibleAddImageForm = false;

  gridOptions: NgxMasonryOptions = {
    gutter: 0,
    originTop: true,
    transitionDuration: '0.4s'
  };

  constructor() {}

  ngOnInit() {}

  showAddImageForm(event) {
    this.visibleAddImageForm = true;
  }

}
