import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  isAppBlocked: Boolean = false;
  sendingForm: Boolean = false;

  constructor() { }

  set block(status) {
    this.isAppBlocked = status;
  }
}
