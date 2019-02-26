import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'ngx-notify';
import { MailService } from '../shared/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private notify: NotifyService,
    private mail: MailService,
  ) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'subject': new FormControl(null, Validators.required),
      'message': new FormControl(null, Validators.required),
    })
  }

  getControl(key) {
    return this.contactForm.get(key);
  }

  get formValues() {
    const { value, valid } = this.contactForm;
    return {
      formValues: value,
      valid,
    };
  }

  onSubmit() {
    const {name, email, subject, message} = this.formValues.formValues;
    this.mail.send({
      name,
      email,
      subject,
      message
    }).subscribe((res: any) => {
        const { status } = res;
        if (status === 201) {
          this.notify.success(`Successfully !`,
          `Mail has been successfully sent`, { timeout: 3000 });
        } else {
          this.notify.error(`Error !`,
          `Mail hasn't been sent`, { timeout: 3000 });
        }
    });

    this.contactForm.reset();
  }

}
