import { PaymentPlanComponent } from './payment-plan.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonsModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentCalculationService } from './payment-calculation.service';
import { DataTableModule } from '../data-table/datatable.module'

@NgModule({
    declarations: [
        PaymentPlanComponent
    ],
    imports: [
      BrowserModule,
      CommonModule,
      CommonsModule,
      FormsModule,
      ReactiveFormsModule,
      DataTableModule
    ],
    exports: [
        PaymentPlanComponent
    ],
    providers: [PaymentCalculationService]
  })
  export class PaymentPlanModule { }