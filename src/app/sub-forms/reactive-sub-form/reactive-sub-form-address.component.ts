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
  formGroupDirective: FormGroupDirective;
  form: FormGroup;

  constructor(parent: FormGroupDirective) {
    this.formGroupDirective = parent;
  }

  ngOnInit() {
    this.form = this.formGroupDirective.form;

    /*
      FormGroupDirective.form is set through an input property, so it won't be set yet in the constructor of the nested form component. If you save the directive instead and call this.formGroupDirective.form in your hook, it should work as intended.
    */
    this.form.addControl(
      'address',
      new FormGroup({
        street: new FormControl('my street'),
        city: new FormControl('my city'),
      })
    );
  }
}
