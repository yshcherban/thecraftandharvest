import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from 'ngx-notify';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
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
  uploadInput: EventEmitter<UploadInput> = new EventEmitter();
  dragOver: boolean;
  uploadingOptions: UploaderOptions;
  images: UploadFile[];
  humanizeBytes: Function;


  constructor(
    private fb: FormBuilder,
    private notify: NotifyService,
    private utils: UtilsService,
    private backend: BackendService,
    ) {
    this.buildForm();
    this.uploadingOptions = { concurrency: 1, maxUploads: 4, allowedContentTypes: ['image/png', 'image/jpeg'] };
    this.humanizeBytes = humanizeBytes;
    this.images = [];
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

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        // const event: UploadInput = {
        //   type: 'uploadAll',
        //   url: '/upload',
        //   method: 'POST',
        //   data: { foo: 'bar' }
        // };
        // this.uploadInput.emit(event);
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.images.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.images.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.images[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.images = this.images.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: `${api.url}/product_images_create/`,
      method: 'POST'
      // includeWebKitFormBoundary: true,
      // data: {}
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeImage(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }


  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  getBlobImage(obj) {
    return this.utils.sanitizeBlobUrl(obj);
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
