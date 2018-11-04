import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { NotifyService } from 'ngx-notify';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { ScreenService } from '../shared/services';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  routeChangeSubscription: Subscription;
  product: any;
  reviews: any[] = [];
  canBeBought = false;

  mock = {
    _id: '5bc7a42ee7453905f9c26f07',
    index: 0,
    guid: 'e230bc02-0433-442a-943d-efd50829c9ca',
    isActive: false,
    price: '$567.17',
    picture: 'https://placeimg.com/900/600/tech',
    name: 'Test Product3',
    description: 'Proident magna non ut voluptate laborum. Culpa incididunt sint ut ipsum nulla et laborum cillum ex id. ' +
     ' Do dolore consectetur et sint deserunt incididunt cupidatat ullamco pariatur nostrud do anim ea.',
    categories: [
      'labore',
      'proident'
    ],
    tags: [
      'dolore',
      'nisi',
      'Lorem',
      'est',
      'labore'
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public screen: ScreenService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.screen.block = true;

    window.scrollTo(0, 0);

    this.routeChangeSubscription = this.route.params
      .pipe(
        // switchMap(params => this.wp.getProductBySlug(params.slug)),
        // map((result: any) => result.body),
        // switchMap(([ product ]) => {
        //   return forkJoin([
        //     of(product),
        //     this.wp.getProductReviews(product.id)
        //       .pipe(map((result: any) => result.body))
        //   ]);
        // })
      ).subscribe((params) => {
        console.log('params ', params);
        this.product = this.mock;
        this.screen.block = false;
      },
      this.onError.bind(this),
      this.onDone.bind(this)
    );
  }

  ngOnDestroy() {
    if (!!this.routeChangeSubscription) {
      this.routeChangeSubscription.unsubscribe();
    }
  }

  private onError(err) {
    const message = !!err.message ? err.message : err.statusText;
    this.notify.error('Error', message, { timeout: 6000 });
    this.screen.block = false;
  }

  private onDone() {
    this.screen.block = false;
  }

}
