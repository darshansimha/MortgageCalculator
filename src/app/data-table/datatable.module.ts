import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { DataTableComponent } from './data-table.component'

@NgModule({
    declarations: [
        DataTableComponent
    ],
    imports: [
      BrowserModule,
      CommonModule
    ],
    exports: [
      DataTableComponent
    ]
  })
  export class DataTableModule { }