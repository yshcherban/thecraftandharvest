import { Component, OnInit, Input } from '@angular/core';

enum types {
  POST = 'post',
  LIST = 'list'
}

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {
  @Input() type: types = types.POST;

  constructor() { }

  ngOnInit() {}

}
