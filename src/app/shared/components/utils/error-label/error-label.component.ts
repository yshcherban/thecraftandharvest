import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-label',
  templateUrl: './error-label.component.html',
  styleUrls: ['./error-label.component.scss']
})
export class ErrorLabelComponent implements OnInit {
  @Input() control: any;

  errors: any[] = [];

  constructor() {}

  ngOnInit() {
    this.errors = !!this.control.errors && Object.keys(this.control.errors)
      .map(key => ({[key]: this.control.errors[key]}));
  }

  checkError(key: string) {
    return !!this.control.errors && !!this.control.errors[key];
  }

  getError(key: string) {
    return this.control.errors[key];
  }

}
