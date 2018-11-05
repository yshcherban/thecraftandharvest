import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'ngx-notify';
import { forkJoin } from 'rxjs';

import { ScreenService } from '../../shared/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menuItems: any[] = [];
  cart: object = {};
  settings: object = {};

  constructor(
    public screen: ScreenService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    // this.screen.block = true;
  }

}
