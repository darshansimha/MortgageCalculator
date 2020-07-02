import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PaymentCalculationService } from './payment-calculation.service';

@Component({
  selector: 'payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css']
})
export class PaymentPlanComponent implements OnInit {
  formConfigurations: any;
  mortgageForm: FormGroup;
  enablePrePayment: boolean = false;
  prePaymentFormConfigurations: Array<any>;
  constructor(public paymentService: PaymentCalculationService) { 
    this.mortgageForm = new FormGroup({
      mortgageAmount : new FormControl(),
      roi : new FormControl(),
      timePeriod : new FormControl(),
      paymentFrequency : new FormControl(),
      term : new FormControl(),
    });
    this.paymentService.notifiyObservable.subscribe((data) => {
      console.log(data);
    })
  }

  ngOnInit() {
    this.formConfigurations = [
      { type: "number", isRequired: true, placeholder: "Mortgage Amount", label: "Mortgage Amount", id: "mortgageAmount", currency: "$", forward: true },
      { type: "number", isRequired: true, placeholder: "Rate of Interest", label: "Interest Rate", id: "roi", currency: "%", forward: false },
      {
        type: "splitDropdown", isRequired: true, label: "Amortization Period", id: "timePeriod", options: [
          { isSequence: true, low: 1, high: 30, postFix: "Year", default: 25, isRequired: true },
          { isSequence: true, low: 0, high: 11, postFix: "Month", default: 0, isRequired: false }
        ]
      },
      {
        type: "dropdown", isRequired: true, label: "Payment Frequency", id: "paymentFrequency", options: [
          { label: "Accelerated Weekly", value: 52.5 },
          { label: "Weekly", value: 52 },
          { label: "Accelerated Bi-Weekly", value: 104.5 },
          { label: "Bi-Weekly", value: 104 },
          { label: "Semi Monthly", value: 24 },
          { label: "Monthly", value: 12 },
        ], default: 12
      },
      { type: "dropdown", isRequired: true, label: "Term", id: "term", isSequence: true, low: 1, high: 10, postFix: "Year", default: 5 },
    ];
  }
  enablePrePaymentSection() {
    this.mortgageForm.addControl("prePaymentAmount", new FormControl());
    this.mortgageForm.addControl("prePaymentFrequency", new FormControl());
    this.mortgageForm.addControl("paymentStart", new FormControl());
    this.prePaymentFormConfigurations = [
      { type: "number", isRequired: true, placeholder: "Prepayment Amount", label: "Prepayment Amount", id: "prePaymentAmount", currency: "$", forward: true, default : 1000},
      {
        type: "dropdown", isRequired: true, label: "PrePayment Frequency", id: "prePaymentFrequency", options: [
          { label: "One Time", value: 1 },
          { label: "Each Year", value: 12 },
          { label: "Same as Regular Payment", value: 13 },
        ], default: 1
      },
      { type: "number", isRequired: false, placeholder: "Start with payment", label: "Start With Payment", id: "paymentStart", default : 1 }
    ]
    
    this.enablePrePayment = !this.enablePrePayment;
  }
  submit() {
    this.paymentService._getDataObserver.next(this.mortgageForm.value);
  }

}
