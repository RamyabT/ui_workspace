import { Injectable, inject } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable } from 'rxjs';


@Injectable()
export class PaymentAmountControlHelper extends BaseFpxControlHelper {
  private _appConfig: AppConfigService = inject(AppConfigService);

  currencyCode!: string;
  constructor() {
    super();

    }

    override doPreInit(): void {
        this.currencyCode = this._appConfig.baseCurrency
    }

   public override doChangeNotify(subject: string, payload: any): void {
    // WRITE CODE HERE TO HANDLE
     this.currencyCode = payload[subject];
   }


  public override doPostLookupInterceptor(data: Observable<any>, key: any): Observable<any> {
     // WRITE CODE HERE TO HANDLE
      return data;
    }

  public onClickControl($event: any) {
    console.log($event.target);
    const integerValue = parseInt($event.target.value);
    const decimalValue = $event.target.value - integerValue;
    if (decimalValue == 0) {
      if (integerValue == 0) {
        $event.target.value = '';
      } else {
        $event.target.value = integerValue;
      }
    } 

    if ($event.target instanceof HTMLInputElement) {
      const len = $event.target.value.length;
      $event.target.setSelectionRange(len, len);
    }
  }

  restrictArrows(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }
}
