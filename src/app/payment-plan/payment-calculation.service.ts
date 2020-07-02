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
    tableData: any = {
        columns : ["Category", "Term", "Amortization Period"],
        rows : [
        
        ],
    }
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
            const worker = new Worker('./mortgage-worker.worker.ts', { type: 'module' });
            worker.onmessage = ({ data }) => {
                console.log(`page got message: ${data}`);
                this._notifyObserver.next(data);
            };
            worker.postMessage(obj);
        } else {
            console.error("Workers not supported");
        }
        this.mortgageCalculationValues(obj);
        console.log(this.tableData);
    }
    mortgageCalculationValues(data: any) {
        const compoundInterest = (data.mortgageAmount * Math.pow((1 + (data.roi / (12 * 100))), (12 * data.term)));
        if(data.timePeriod["timePeriod1"] == 0) {
            data.timePeriod["timePeriod1"] = 1;
        }
        this.tableData.rows = [];
        this.tableData.rows.push(["Number of Payments", data.term * data.paymentFrequency, data.term * data.paymentFrequency * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"])]);
        this.tableData.rows.push(["Mortgage Payment", compoundInterest / (data.timePeriod["timePeriod0"] + (data.timePeriod["timePeriod1"] / 12)), compoundInterest / (data.timePeriod["timePeriod0"] + (data.timePeriod["timePeriod1"] / 12))]);
        this.tableData.rows.push(["Pre Payment", (data.prePaymentAmount) ? data.prePaymentAmount : 0, (data.prePaymentAmount) ? data.prePaymentAmount : 0]);
        this.tableData.rows.push(["Principal Payments", data.mortgageAmount / data.term, (data.mortgageAmount / data.term) * (data.timePeriod["timePeriod0"]) * (data.timePeriod["timePeriod1"])]);
        this.tableData.rows.push(["Interest Payment", compoundInterest - data.mortgageAmount, (compoundInterest - data.mortgageAmount) * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"])]);
        this.tableData.rows.push(["Total Cost", compoundInterest, compoundInterest * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"])]);
        this.tableData.rows.push(["Interest Savings with a Non-Monthly Payment Plan", (data.mortgageAmount / data.term) + 860, ((data.mortgageAmount / data.term) + 860) * data.timePeriod["timePeriod0"] * (data.timePeriod["timePeriod1"])]);
    }
}
