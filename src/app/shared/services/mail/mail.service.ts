import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private api: APIService
  ) { }

  public send(formData) {
    const url = `/contact-form/`;
    return this.api.postData(url, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      },
    );
  }
}
