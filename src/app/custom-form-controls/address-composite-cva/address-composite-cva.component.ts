import { Component, ElementRef, OnInit, Self, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

/**
 * @description Requirements
 *  Support everything a regular text field does (implement ControlValueAccessor)
 *  Required validation
 *  Error message that shows when control is invalid
 *    for any reason
 */
@Component({
  selector: 'app-address-composite-cva',
  template: `
    <h2>Address (composite control value accessor)</h2>
    <div [formGroup]="form">
      <input formControlName="street" (blur)="onTouched()">
      <input formControlName="city" (blur)="onTouched()">
    </div>
  `,
  styles: [],

  //  Don't provide ValueAccessor or Validation as this would make a circular reference.
  // NgControl injects value accessor && validators, so we can't inject it, if it is also
  // injecting us.
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   multi: true,
    //   useExisting: RequiredTextComponent, // Hoisting
    // },
    // {
    //   provide: NG_VALIDATORS,
    //   multi: true,
    //   useExisting: RequiredTextComponent, // Hoisting
    // },
  ],
})
export class AddressCompositeCvaComponent
  implements OnInit, ControlValueAccessor, Validator
{
  form: FormGroup;

  //  ControlValueAccessor Impl
  // disabled = false;
  // onChange = (value: string): void => {};
  onTouched = (): void => {};

  //  NgControl => NgModel, FormControlDirective, FormControlName
  //  See images in assets 'ng-control-hierarchy'
  //  @Self in case somebody wraps your form control with their own form control. Don't want to grab theirs.
  constructor(
    @Self() public controlDir: NgControl,
    private formBuilder: FormBuilder
  ) {
    //  It's our job to make sure NgControl is set up with the right valueAccessor and validators
    controlDir.valueAccessor = this;

    this.form = formBuilder.group({
      street: [],
      city: [],
    });
  }

  ngOnInit() {
    //  Our job to make sure NgControl is set up with the right valueAccessor and validators
    this.addValidators(this.controlDir.control);
  }

  //  TODO: Consider putting this in utils
  addValidators(control: AbstractControl | null): void {
    if (!control) {
      console.log(`${this.constructor}: No control`);
    }

    const validators = control?.validator
      ? [control.validator, Validators.required]
      : Validators.required;

    control?.setValidators(validators);
    control?.updateValueAndValidity();
  }

  //#region ControlValueAccessor Implementation
  /**
   * Write value to view
   * @param value value to write
   */
  // tslint:disable-next-line: no-any
  writeValue(value: any): void {
    //  Be careful if using 'patchValue' as it can introduce junk values
    // into the form
    //
    //  Don't emit as we don't want to mess up dirtiness logic, or make valueChanges
    // fire a wasteful round (see 'registerOnChange' below)
    value && this.form.setValue(value, { emitEvent: false });
  }

  /**
   * Save off callback to call on change
   * @description Our responsibility to know when to call it (see template input event)
   * @param fn Forms API function to call when the value changes in
   * the DOM
   */
  // tslint:disable-next-line: no-any
  registerOnChange(fn: (value: string) => void): void {
    this.form.valueChanges.subscribe(fn);
  }

  /**
   * Save off callback to call on change
   * @description Our responsibility to know when to call it (see template onBlur event)
   * @param fn Forms API function to call when the control has been touched in
   * the DOM
   */
  // tslint:disable-next-line: no-any
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Enable/disable element in view
   */
  setDisabledState(disabled: boolean): void {
    disabled ? this.form.disable() : this.form.enable();
  }
  //#endregion

  // ** NOTE **
  //  This will not be called as we aren't providing NG_VALIDATORS
  validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
