import { Injectable, OnDestroy } from "@angular/core";
import { Observer, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PaymentCalculationService implements OnDestroy {
    private static _instance: PaymentCalculationService;
    _getDataObserver: Observer<any>;
    getDataObservable: Observable<any> = new Observable<any>((observer: any) =>
        this._getDataObserver = observer
    );
    getDataSubscripton: Subscription;
    tableData: any;
    constructor(private http: HttpClient) {
        if (!PaymentCalculationService._instance) {
            PaymentCalculationService._instance = this;
        }
        this.getDataSubscripton = this.getDataObservable.subscribe((data) => {
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
    fetchFormConfigurations(): Observable<any> {
        return this.http.get('../../assets/data/formconfiguration.json')
    }
    fetchPrepaymentFormConfigurations(): Observable<any> {
        return this.http.get('../../assets/data/prePaymentFormConfigurations.json');
    }
    ngOnDestroy() {
        this.getDataSubscripton.unsubscribe();
    }
}
