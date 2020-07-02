import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentCalculationService } from './payment-calculation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.css'],
})
export class PaymentPlanComponent implements OnInit {
  formConfigurations: any;
  mortgageForm: FormGroup;
  enablePrePayment: boolean = false;
  prePaymentFormConfigurations: Array<any>;
  constructor(public paymentService: PaymentCalculationService, private http: HttpClient, private cdRef: ChangeDetectorRef) { 
    this.paymentService.notifiyObservable.subscribe((data) => {
      console.log(data);
    })
  }

  ngOnInit() {
    this.mortgageForm = new FormGroup({
      mortgageAmount : new FormControl('', [Validators.min(0)]),
      roi : new FormControl('', [Validators.min(0)]),
      timePeriod : new FormControl(),
      paymentFrequency : new FormControl(),
      term : new FormControl(),
    });
    this.http.get('../../assets/data/formconfiguration.json').subscribe((data) => {
      this.formConfigurations = data["data"];
      this.cdRef.detectChanges();
    })
  }
  enablePrePaymentSection() {
    this.mortgageForm.addControl("prePaymentAmount", new FormControl('', [Validators.min(0)]));
    this.mortgageForm.addControl("prePaymentFrequency", new FormControl());
    this.mortgageForm.addControl("paymentStart", new FormControl('', [Validators.min(0)]));
    this.http.get('../../assets/data/prePaymentFormConfigurations.json').subscribe((data) => {
      this.prePaymentFormConfigurations = data["data"];
      this.cdRef.detectChanges();
    });
    
    this.enablePrePayment = !this.enablePrePayment;
  }
  submit() {
    this.paymentService._getDataObserver.next(this.mortgageForm.value);
  }

}
