import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentPlanComponent } from './payment-plan.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableModule } from '../data-table/datatable.module'
import { PaymentCalculationService } from './payment-calculation.service';
import { Observable } from 'rxjs';

fdescribe('PaymentPlanComponent', () => {
  let component: PaymentPlanComponent;
  let fixture: ComponentFixture<PaymentPlanComponent>;
  let service: PaymentCalculationService;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        DataTableModule,
      ],
      declarations: [PaymentPlanComponent],
      providers: [
        PaymentCalculationService
      ]
    })
      .compileComponents();
      service = TestBed.inject(PaymentCalculationService);
      httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('enables prepayment', () => {
    component.mortgageForm  = new FormGroup({
      mortgageAmount : new FormControl('', [Validators.min(0)]),
      roi : new FormControl('', [Validators.min(0)]),
      timePeriod : new FormControl(),
      paymentFrequency : new FormControl(),
      term : new FormControl(),
    });
    const res = { 'status': 200 };
    spyOn((component as any).http, 'get').and.returnValue(Observable.create);
        
    
  })
});
