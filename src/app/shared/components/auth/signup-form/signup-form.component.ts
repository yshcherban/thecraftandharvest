import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @Input() data: object;
  @Output() formSubmmit = new EventEmitter();

  form: FormGroup;

  constructor(
    private fb: FormBuilder
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
    this.formSubmmit.emit(this.formValues);
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
      username: ['', Validators.required],
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }
}
