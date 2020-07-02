import { TextboxComponent } from './textbox/textbox.component';
import { NumberFieldComponent } from './number-field/number-field.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitDropdownComponent } from './split-dropdown/split-dropdown.component';

@NgModule({
    declarations: [
      TextboxComponent,
      NumberFieldComponent,
      DropdownComponent,
      SplitDropdownComponent
    ],
    imports: [
      BrowserModule,
      CommonModule
    ],
    exports: [
      TextboxComponent,
      NumberFieldComponent,
      DropdownComponent,
      SplitDropdownComponent
    ],
    providers: []
  })
  export class CommonsModule { }