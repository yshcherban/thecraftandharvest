import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'ngx-notify';

import { ScreenService, BackendService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  carouselImages = [
    'assets/images/banner/craftandharvest-slide-1.jpg',
    'assets/images/banner/craftandharvest-slide-2.jpg',
    'assets/images/banner/craftandharvest-slide-3.jpg',
    'assets/images/banner/craftandharvest-slide-4.jpg',
    'assets/images/banner/craftandharvest-slide-5.jpg'
  ];

  constructor(
    private screen: ScreenService,
    private notify: NotifyService,
    private backend: BackendService,
  ) {}

  ngOnInit() {
    this.screen.block = true;
    setTimeout(() => {
      this.screen.block = false;
    }, 0);
  }
}
