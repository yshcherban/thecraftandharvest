import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule, InputText } from 'primeng/inputtext';
import { InputTextareaModule, InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule, Dropdown } from 'primeng/dropdown';
import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
import { CheckboxModule, Checkbox } from 'primeng/checkbox';
import { CalendarModule, Calendar } from 'primeng/calendar';
import { SliderModule, Slider } from 'primeng/slider';
import { ButtonModule, Button, ButtonDirective } from 'primeng/button';
import { DialogModule, Dialog } from 'primeng/dialog';
import { ProgressBarModule, ProgressBar } from 'primeng/progressbar';
import { GalleriaModule, Galleria } from 'primeng/galleria';
import { ChipsModule, Chips } from 'primeng/chips';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { MultiSelectModule, MultiSelect } from 'primeng/multiselect';
import { Footer } from 'primeng/primeng';

import { NgxUploaderModule, NgFileDropDirective } from 'ngx-uploader';

@NgModule({
  imports: [
    CommonModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    CheckboxModule,
    CalendarModule,
    SliderModule,
    ButtonModule,
    DialogModule,
    ProgressBarModule,
    GalleriaModule,
    ChipsModule,
    FileUploadModule,
    MultiSelectModule,
    NgxUploaderModule
  ],
  declarations: [],
  exports: [
    InputText,
    InputTextareaModule,
    InputTextarea,
    Dropdown,
    AutoComplete,
    Checkbox,
    Calendar,
    Slider,
    Button,
    ButtonDirective,
    Dialog,
    ProgressBar,
    Galleria,
    Chips,
    FileUpload,
    MultiSelect,
    NgFileDropDirective,
    Footer
  ]
})
export class PrimeNGModule {}
