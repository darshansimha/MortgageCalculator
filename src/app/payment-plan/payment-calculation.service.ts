import { Injectable } from "@angular/core";
import { Observer, Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentCalculationService {
    private static _instance: PaymentCalculationService;
    _getDataObserver: Observer<any>;
    getDataObservable: Observable<any> = new Observable<any>((observer: any) =>
        this._getDataObserver = observer
    );
    _notifyObserver: Observer<any>;
    notifiyObservable: Observable<any> = new Observable<any>((observer: any) =>
        this._notifyObserver = observer
    );
    constructor() {
        if (!PaymentCalculationService._instance) {
            PaymentCalculationService._instance = this;
        }
        this.getDataObservable.subscribe((data) => {
            this.calculate(data);
        })
        return PaymentCalculationService._instance;
    }
    calculate(obj) {
        if (typeof Worker !== 'undefined') {
            const worker = new Worker('./mortgage-worker.worker.ts');
            worker.onmessage = ({ data }) => {
              console.log(`page got message: ${data}`);
              this._notifyObserver.next(data);
            };
            worker.postMessage(obj);
          } else {
              console.error("Workers not supported");
          }
        }
    }

    // const mortgageCalculationValues = (evt) => {
    //     let result = {
    //         numberOfPayments : 0,
    //         mortgagePayment : 0,
    //         prePayment : 0,
    //         principalPayment : 0,
    //         interestPayment : 0,
    //         totalCost : 0,
    //         interestSavingsWithNonMonthlyPlan : 0
    //     }
    //     const compoundInterest = (evt.mortgageAmount * Math.pow((1 + (evt.roi / (12 * 100))), (12 * evt.term)));
    //     result.totalCost = compoundInterest;
    //     result.numberOfPayments = evt.term * evt.paymentFrequency;
    //     result.mortgagePayment = compoundInterest/(evt.timePeriod["timePeriod0"] + (evt.timePeriod["timePeriod1"]/12))
    //     result.prePayment = evt.prePaymentAmount;
    //     result.interestPayment = compoundInterest - evt.mortgageAmount;
    //     result.principalPayment = evt.mortgageAmount/evt.term;
    //     result.interestSavingsWithNonMonthlyPlan = (evt.mortgageAmount/evt.term) + 860;

    //     return result;
    // }
