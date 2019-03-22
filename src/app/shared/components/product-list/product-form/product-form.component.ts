import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from 'ngx-notify';
import { UtilsService } from '../../../services';
const api = require('../../../../../config/api.json');
import { BackendService } from '../../../../shared/services';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() data: object;
  //@ViewChild('uploader') uploader: ElementRef;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notify: NotifyService,
    private backend: BackendService,
    ) {
    this.buildForm();
  }

  get formValues() {
    const { value, valid } = this.form;
    return {
      formValues: value,
      valid,
    };
  }

  ngOnInit() {
    if (!!this.data) {
      this.form.patchValue(this.data);
    }
  }

  handleSubmit() {
    const {name, description, product_tag, price, sku} = this.formValues.formValues;
    const product = {
      name,
      description,
      product_tag,
      price,
      sku
    };

    this.backend.saveProduct(product).subscribe((res: any) => {
      const { status } = res;
      if (status === 201) {
        this.notify.success(`Done`, `Product successfully added`, { timeout: 3000 });
      }
    });

  }

  resetForm() {
    if (this.form) {
      this.form.reset();
      this.buildForm();
    }
  }

  getControl(key) {
    return this.form.get(key);
  }

  private buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      product_tag: [[], Validators.required],
      price: ['', Validators.required],
      sku: ['', Validators.required]
    });
  }
}
