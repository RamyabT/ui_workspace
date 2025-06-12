import { Injectable } from '@angular/core';
import { FpxCurrAmountService, FPXFileUploadService } from '@fpx/core';
import { HttpProviderService, HttpRequest } from '@fpx/core';
import { map } from 'rxjs';
import { AppConfigService } from '../app-config-service/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class CustomCurrAmountService extends FpxCurrAmountService {

  constructor(private _httpProvider: HttpProviderService) {
    super();
  }
  override fetchCurrency() {
    const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/currency');
      httpRequest.addQueryParameter('lookup', "1");
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: any) => {
          this.setCurrencyList(res.body?.Data);
          return res.body?.Data;
        })
      );
  }
}
