import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  isFormInValid: boolean = false;
  constructor(public paymentService: PaymentCalculationService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.mortgageForm = this.formBuilder.group({
      mortgageAmount: ['', [Validators.min(0)]],
      roi: ['', [Validators.min(0)]],
      timePeriod: [''],
      paymentFrequency: [''],
      term: [''],
    });
    this.paymentService.fetchFormConfigurations().pipe(map((response: any) => response["data"])).subscribe((data) => {
      this.formConfigurations = data;
    });
    this.mortgageForm.statusChanges.subscribe((data) => {
      if(data === 'INVALID')
        this.isFormInValid = true;
      else
        this.isFormInValid = false;
    })
  }
  enablePrePaymentSection() {
    this.mortgageForm.addControl("prePaymentAmount", new FormControl('', [Validators.min(0)]));
    this.mortgageForm.addControl("prePaymentFrequency", new FormControl());
    this.mortgageForm.addControl("paymentStart", new FormControl('', [Validators.min(0)]));
    this.paymentService.fetchPrepaymentFormConfigurations().pipe(map((response: any) => response["data"])).subscribe((data) => {
      this.prePaymentFormConfigurations = data;
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
