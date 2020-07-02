import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentPlanModule } from './payment-plan/payment-plan.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaymentPlanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
