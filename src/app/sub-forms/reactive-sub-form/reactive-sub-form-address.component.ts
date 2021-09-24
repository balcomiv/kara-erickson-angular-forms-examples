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

    <p>Form:</p>
    <pre>{{ form.value | json }}</pre>
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
    if (!parent) {
      throw new Error('What?');
    }

    console.log('parent: ', parent.value);
    this.form = parent.form;
  }

  ngOnInit() {
    this.form.addControl(
      'address',
      new FormGroup({
        street: new FormControl('my street'),
        city: new FormControl('my city'),
      })
    );

    console.log('form value: ', JSON.stringify(this.form.value));
  }
}
