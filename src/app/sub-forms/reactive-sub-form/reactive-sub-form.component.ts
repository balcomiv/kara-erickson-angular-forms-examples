import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-sub-form',
  template: `
    <form [formGroup]="form">
      <app-reactive-sub-form-address></app-reactive-sub-form-address>
    </form>
  `,
  styles: [
    `
    :host {
      display: block;
      border: 1px solid green;
      margin: 15px;
      padding: 15px;
    }
  `,
  ],
})
export class ReactiveSubFormAddressComponent {
  form = new FormGroup({});
}
