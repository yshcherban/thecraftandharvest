import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotifyService } from 'ngx-notify';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

import { UtilsService } from '../../../services';
//import api from '../../../../../config/api.json';
const api = require('../../../../../config/api.json');
//import api from '../../../../../config/api.json';

enum Steps {
  INVALID = -1,
  READY = 0,
  UPLOADED_IMAGES = 1,
  FILLING_FORM = 2,
  CANCELED = 3,
  DONE = 4,
  ERROR = 5,
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() data: object;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @ViewChild('uploader') uploader: ElementRef;
  form: FormGroup;
  steps: Steps = Steps.INVALID;
  uploadInput: EventEmitter<UploadInput> = new EventEmitter();
  dragOver = false;
  uploadingOptions: UploaderOptions;
  images: UploadFile[];
  humanizeBytes: Function;

  categorieList = [
    {label: 'Escenta', value: {id: 1, code: 'esc'}},
    {label: 'Icology', value: {id: 2, code: 'ico'}},
    {label: 'Nixelt', value: {id: 3, code: 'nix'}},
    {label: 'Dognost', value: {id: 4, code: 'dog'}},
    {label: 'Jetsilk', value: {id: 5, code: 'jet'}},
    {label: 'Pharmacon', value: {id: 6, code: 'phar'}}
  ];

  constructor(
    private fb: FormBuilder,
    private notify: NotifyService,
    private utils: UtilsService,
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
    this.steps = Steps.READY;
    this.form.patchValue({
      name: 'Test 1',
      price: 200,
      description: 'This is just a test product',
      categories: [{id: 1, code: 'esc'}, {id: 2, code: 'ico'}],
      tags: ['tag1', 'tag2']
    });
  }

  handleSubmit() {
    this.formSubmit.emit(this.formValues);
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

  onUploadOutput({ type, file, ...evt }) {
    switch (type) {
      case 'dragOver':
          this.dragOver = true;
        break;
      case 'removed':
          this.images = this.images
            .filter((img: UploadFile) => img !== file);
        break;
      case 'addedToQueue':
          if (file) {
            this.images.push(file);
          }
        break;
      case 'done':
          if (this.checkImagesUploading(this.images)) {
            const mappedImages = this.images.map(({ name }) => name);
            this.form.patchValue({
              images: mappedImages,
              image: mappedImages[0] || null
            });
            setTimeout(() => {
              this.steps = Steps.UPLOADED_IMAGES;
            }, 1500);
          }
        break;
      default:
          this.dragOver = false;
        break;
    }
    this.imageStateHandler(this.images);
    return true;
  }

  removeImage(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  getBlobImage(obj) {
    return this.utils.sanitizeBlobUrl(obj);
  }

  private imageStateHandler(images: any[]) {
    images.forEach(img => {
      if (img.hasOwnProperty('responseStatus') && img.responseStatus !== 200) {
        img.error = 'Error uploading image';
        img.progress.data.percentage = -1;
        this.steps = Steps.ERROR;
      } else {
        this.steps = Steps.READY;
      }
    });
  }

  private checkImagesUploading(images: any[]) {
    return images.every(img => img.responseStatus && img.responseStatus === 200);
  }

  private buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      categories: [[], Validators.required],
      tags: [[], Validators.required],
      images: [[], Validators.required],
      image: ['', Validators.required],
    });
  }
}
