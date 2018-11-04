import { Component, OnInit, Input, ContentChild } from '@angular/core';

enum Types {
  Banner = 'banner',
  Carousel = 'carousel'
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() dataList: any[];
  @Input() type: Types = Types.Banner;
  @ContentChild('itemTemplate') itemTemplate;

  carouselConfig = {};

  constructor() { }

  ngOnInit() {
    this.carouselConfig = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: {
        timing: 10000,
        initialDelay: 1000
      },
      point: {
        visible: false
      },
      load: 2,
      loop: true,
      easing: 'ease',
      animation: 'lazy'
      // touch: true
    };
  }

  onSliderMoveFn(evt) {
    // console.log('moving ', evt);
  }

}
