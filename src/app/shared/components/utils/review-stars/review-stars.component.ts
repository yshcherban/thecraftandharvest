import { Component, OnInit, Input } from '@angular/core';

enum ratingTypes {
  smiles = 'smiles',
  stars = 'stars'
}

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.scss']
})
export class ReviewStarsComponent implements OnInit {
  @Input() type: ratingTypes;
  @Input() rating: any;
  @Input() counter: number;

  totalStars = 5;
  ratingIterable: any[] = [];

  constructor() {}

  ngOnInit() {
    const total = Math.round(parseFloat(this.rating));

    if (!this.type) {
      this.type = ratingTypes.stars;
    }

    this.ratingIterable = Array
      .apply(null, Array(this.totalStars))
      .map((num, i) => (i + 1))
      .map(num => num <= total ? true : null);
  }

  get hasCounter() {
    return typeof this.counter !== 'undefined';
  }

}
