import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { UtilsService } from '../../../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const api = require('../../../../../../config/api.json');
import { AuthService } from '../../../../services/auth/auth.service';

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

  constructor(
    private utils: UtilsService,
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.uploadingOptions = { concurrency: 1, maxUploads: 4, allowedContentTypes: ['image/png', 'image/jpeg'] };
    this.humanizeBytes = humanizeBytes;
    this.images = [];
    this.buildForm();
  }

  ngOnInit() {
  }

  handleSubmit() {
    // const imagesInBlob = this.images.map((img, key) => {
    //   return this.getBlobImage(img.nativeFile);
    // });

    // console.log(
    //   {
    //     'Authorization': `JWT ${this.auth.token}`,
    //     "product": this.productId,
    //     "filecomment": "product image",
    //     "images": imagesInBlob
    //   })

    this.startUpload();
  }

  getControl(key) {
    return this.imageform.get(key);
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
    console.log(this.auth.token);
    const productId = this.productId;
    const imagesInBlob = this.images.map((img, key) => {
      return img.nativeFile;
    });

    const imgFile = [...imagesInBlob];

    console.log(imgFile);

    const event: UploadInput = {
      type: 'uploadAll',
      url: `${api.url}/product_images_create/`,
      method: 'POST',
      headers: {
        'Authorization': `JWT ${this.auth.token}`,
        'Content-Type': 'multipart/form-data',
      },
      //includeWebKitFormBoundary: true,
      data: {
        "product": "2",
        "filecomment": "product image",
        "images": "https://cdn.vox-cdn.com/thumbor/USPKT0Vcmjkcx_7kb-lBLnuJ1Is=/983x935:2424x2667/1200x800/filters:focal(1351x1042:1991x1682)/cdn.vox-cdn.com/uploads/chorus_image/image/60034597/GettyImages_971886594.0.jpg",
      }
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
