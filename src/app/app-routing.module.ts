import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'mortgagecalculator' },
  { path: 'mortgagecalculator', component: PaymentPlanComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
