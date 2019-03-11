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
    'assets/images/banner/craftandharvest-slide-6.png',
    'assets/images/banner/craftandharvest-slide-7.jpg',
    'assets/images/banner/craftandharvest-slide-8.jpg',
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
