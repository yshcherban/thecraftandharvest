import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  avatarUrl = 'http://i.pravatar.cc';

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  public addClickOutsideEvent(ref, cb) {
    const listener = fromEvent(document, 'mousedown')
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(({ target }) => {
        if (!ref.contains(target)) {
          if (typeof cb === 'function') {
            cb();
          }
          listener.unsubscribe();
        }
      });
  }

  public sortByDate(arr, field) {
    return arr.sort((left, right) => {
      return moment(left[field])
        .clone()
        .isBefore(right[field])
        ? 1
        : -1;
    });
  }

  public generateAvatar(id, size = 200) {
    return `${this.avatarUrl}/${size}?u=${id}`;
  }

  public sanitizeBlobUrl(fileObj) {
    const blob = new Blob([fileObj], { type: 'application/octet-stream' });
    return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  toCleanDate(date: any) {
    return moment(date)
      .clone()
      .format(DATE_FORMAT);
  }

  toLabel(str: string): string {
    return str
      .split('')
      .map(
        (word, i) =>
          word === word.toUpperCase()
            ? ` ${word}`
            : i === 0
              ? `${word.toUpperCase()}`
              : word
      )
      .join('');
  }

  parseBodyErros(body) {
    const parsed = JSON.parse(body || '{}');
    return Object.keys(parsed)
      .map(key => parsed[key])
      .map(item => item[0]);
  }

}
