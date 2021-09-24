import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
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
  form = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}
}
