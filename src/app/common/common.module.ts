import { NumberFieldComponent } from './number-field/number-field.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitDropdownComponent } from './split-dropdown/split-dropdown.component';

@NgModule({
    declarations: [
      NumberFieldComponent,
      DropdownComponent,
      SplitDropdownComponent
    ],
    imports: [
      BrowserModule,
      CommonModule
    ],
    exports: [
      NumberFieldComponent,
      DropdownComponent,
      SplitDropdownComponent
    ],
    providers: []
  })
  export class CommonsModule { }