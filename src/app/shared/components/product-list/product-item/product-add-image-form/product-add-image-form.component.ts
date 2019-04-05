import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { UtilsService } from '../../../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const api = require('../../../../../../config/api.json');
import { AuthService } from '../../../../services/auth/auth.service';
import { APIService } from '../../../../services/api/api.service';
import { NotifyService } from 'ngx-notify';

@Component({
  selector: 'app-product-add-image-form',
  templateUrl: './product-add-image-form.component.html',
  styleUrls: ['./product-add-image-form.component.scss']
})
export class ProductAddImageFormComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput> = new EventEmitter();
  dragOver: boolean;
  uploadingOptions: UploaderOptions;
  images: UploadFile[];
  humanizeBytes: Function;
  imageform: FormGroup;
  @Input() productId: any;
  savebuttonStatus = true;

  constructor(
    private utils: UtilsService,
    private fb: FormBuilder,
    private auth: AuthService,
    private api: APIService,
    private notify: NotifyService,
  ) {
    this.uploadingOptions = { concurrency: 1, maxUploads: 1, allowedContentTypes: ['image/png', 'image/jpeg'] };
    this.humanizeBytes = humanizeBytes;
    this.images = [];
    this.buildForm();
  }

  ngOnInit() {
  }

  handleSubmit() {
    const productId = this.productId;
    this.savebuttonStatus = true;
    const url = `/product_images_create/`;

    const nativeImageObjectsArr = this.images.map((img, key) => {
      return img.nativeFile;
    });

    const nativeImageFileObject = [...nativeImageObjectsArr][0];


    const fd = new FormData();
    fd.append("product", productId);
    fd.append("filecomment", "product image");
    fd.append("images", nativeImageFileObject);


    return this.api.postData(url,
      fd
      , {
        headers: {
          'Authorization': `JWT ${this.auth.token}`,
        },
      },
    ).subscribe((res: any) => {
      const { status } = res;
      if (status === 201) {
        this.notify.success(`Done`, `Image successfully added`, { timeout: 3000 });
      } else {
        this.notify.error(`Error`, `Image was not uploaded`, { timeout: 3000 });
      }
    });

  }

  getControl(key) {
    return this.imageform.get(key);
  }

  onUploadOutput(output: UploadOutput): void {
    this.savebuttonStatus = false;
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
      method: 'POST',
      headers: {
        'Authorization': `JWT ${this.auth.token}`,
      },
      //includeWebKitFormBoundary: true,
      data: {}
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
    this.imageform = this.fb.group({
      product_image: ['', Validators.required],
    });
  }

}
