import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-sub-form-address',
  template: `
    <div formGroupName="address">
      <input formControlName="street">
      <input formControlName="city">
    </div>
  `,
  styles: [
    `
    input: {
      display: block;
      border: 3px solid red;
    }
  `,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class ReactiveSubFormComponent implements OnInit {
  form: FormGroup;

  constructor(parent: FormGroupDirective) {
    this.form = parent.form;
  }

  ngOnInit() {
    this.form.addControl(
      'address',
      new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
      })
    );
  }
}
