import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { RequiredTextCvaComponent } from './custom-form-controls/required-text-cva/required-text-cva.component';
import { AddressCompositeCvaComponent } from './custom-form-controls/address-composite-cva/address-composite-cva.component';

@NgModule({
  imports: [CommonModule, BrowserModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    RequiredTextCvaComponent,
    AddressCompositeCvaComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
