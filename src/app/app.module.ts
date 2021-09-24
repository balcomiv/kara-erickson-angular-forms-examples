import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { RequiredTextCvaComponent } from './custom-form-controls/required-text-cva/required-text-cva.component';
import { AddressCompositeCvaComponent } from './custom-form-controls/address-composite-cva/address-composite-cva.component';
import { ReactiveSubFormAddressComponent } from './sub-forms/reactive-sub-form/reactive-sub-form.component';
import { ReactiveSubFormComponent } from './sub-forms/reactive-sub-form/reactive-sub-form-address.component';

@NgModule({
  imports: [CommonModule, BrowserModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    RequiredTextCvaComponent,
    AddressCompositeCvaComponent,
    ReactiveSubFormComponent,
    ReactiveSubFormAddressComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
