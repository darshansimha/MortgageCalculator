import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentCalculationService } from './payment-calculation.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css'],
})
export class PaymentPlanComponent implements OnInit, OnDestroy {
  formConfigurations: any;
  mortgageForm: FormGroup;
  enablePrePayment: boolean = false;
  prePaymentFormConfigurations: Array<any>;
  constructor(public paymentService: PaymentCalculationService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.mortgageForm = new FormGroup({
      mortgageAmount: new FormControl('', [Validators.min(0)]),
      roi: new FormControl('', [Validators.min(0)]),
      timePeriod: new FormControl(),
      paymentFrequency: new FormControl(),
      term: new FormControl(),
    });
    this.paymentService.fetchFormConfigurations().pipe(map((response: any) => response["data"])).subscribe((data) => {
      this.formConfigurations = data;
      this.cdRef.detectChanges();
    });
  }
  enablePrePaymentSection() {
    this.mortgageForm.addControl("prePaymentAmount", new FormControl('', [Validators.min(0)]));
    this.mortgageForm.addControl("prePaymentFrequency", new FormControl());
    this.mortgageForm.addControl("paymentStart", new FormControl('', [Validators.min(0)]));
    this.paymentService.fetchPrepaymentFormConfigurations().pipe(map((response: any) => response["data"])).subscribe((data) => {
      this.prePaymentFormConfigurations = data;
      this.cdRef.detectChanges();
    });
    this.enablePrePayment = !this.enablePrePayment;
  }
  submit() {
    this.paymentService._getDataObserver.next(this.mortgageForm.value);
  }

  ngOnDestroy(): void {
    this.mortgageForm = null;
  }

}
