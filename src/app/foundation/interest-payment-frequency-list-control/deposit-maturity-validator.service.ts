import { ChangeDetectorRef, EventEmitter, Injectable, Optional } from "@angular/core";
import { Casaaccount } from "../../foundation/casaaccount-service/casaaccount.model";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";

@Injectable()
export class DepositMaturityValidator {
  constructor(
    private _httpProvider: HttpProviderService) {
  }
  depositMaturityValidation(
    eventEmitter: EventEmitter<{
      eventName: string;
      payload: any;
    }>,
    depositMap: Map<string, string>
  ): AsyncValidatorFn {
    console.warn('Deposit Maturity validation begins');

    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {

      console.log('Product Code', control.parent?.get('productCode')?.value);
      console.log('Deposit Amount', control.parent?.get('depositAmount')?.value?.amount);
      console.log('Tenor In Months', control.parent?.get('tenorInMonths')?.value);
      console.log('Deposit Date', control.parent?.get('depositDate')?.value);
      console.log('Interest Payment Frequency', control.value);

      if (control.parent?.get('productCode')?.value && control.parent?.get('depositAmount')?.value?.amount
        && control.parent?.get('tenorInMonths')?.value && control.parent?.get('depositDate')?.value && control.value) {

        const httpRequest = new HttpRequest();
        httpRequest.setMethod("GET");
        httpRequest.setResource("/deposit/calculate/maturity");
        httpRequest.addQueryParameter("depositAmount", control.parent?.get('depositAmount')?.value?.amount);
        httpRequest.addQueryParameter("depositDate", control.parent?.get('depositDate')?.value);
        httpRequest.addQueryParameter("productCode", control.parent?.get('productCode')?.value);
        console.log("controldata", control);
        if (control.parent?.value.tenorUnit == 'Y') {
          httpRequest.addQueryParameter("year", control.parent?.get('tenorInMonths')?.value);
        }
        else {
          httpRequest.addQueryParameter("month", control.parent?.get('tenorInMonths')?.value);
        }
        httpRequest.addQueryParameter("interestPayFreq", control.value);
        httpRequest.addHeaderParamter("serviceCode", "RETAILMATURITYCALCULATOR")
        httpRequest.setContextPath('Deposits');
        return this._httpProvider.invokeRestApi(httpRequest).pipe(
          map((res: IHttpSuccessPayload<any>) =>
            res.body.depositscalculator ?? null
          )
        )
          .pipe(
            map((res: any) => {
              console.log('Maturity Information received ', res);

              eventEmitter.emit({
                eventName: 'interestpaymentfrequencyDataReceived',
                payload: res
              });
              // this.changeDetectorRef.markForCheck();
              return null;
            }),
            catchError((err: IHttpErrorPayload) => {
              let error: any = {};
              // error[err.error.errorCode] = true;
              error['fetch_error'] = true;
              // this.changeDetectorRef.markForCheck();
              return of(error);
            })
          )
      }
      else {
        return of(null);
      }
    }
  }
}
