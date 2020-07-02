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
    tableData: any;
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
                this.tableData = data;
            };
            worker.postMessage(obj);
        } else {
            console.error("Workers not supported");
        }
    }
}
