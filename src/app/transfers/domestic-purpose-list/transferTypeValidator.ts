import { ChangeDetectorRef, EventEmitter, Injectable, Optional } from "@angular/core";
// import { Casaaccount } from "../casaaccount-service/casaaccount.model";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";

@Injectable()
export class TransferTypeValidaton {
  constructor(
    private _httpProvider: HttpProviderService) {
  }
  transferTypeValidation(

    eventEmitter: EventEmitter<{
      eventName: string;
      payload: any;

    }>,
    dependentFieldMap: Map<string, string>
  ): AsyncValidatorFn {

    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {

      // console.log('Amount checked isss', control.value.amount);
      let amount: any;
      let currency: any;
      let serviceCode: any;
      let chargesBorneBy: any;
      let payload: any;
      let fromAccount:any;
      let toAccount:any;  

      if (control.value) {
        console.log('From currency', dependentFieldMap.get('amount'));
        payload={
          amount:dependentFieldMap.get('amount'),
          currency:dependentFieldMap.get('currency'),
          purposeCode:control.value
        }
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setResource('/transferTypeValidation');
        let bodyContent = { "transferTypeValidation": payload };
        httpRequest.setBody(bodyContent);
        httpRequest.setContextPath('Payments');
        // httpRequest.addHeaderParamter('serviceCode', 'RETAILCHARGESERVICE');
        return this._httpProvider.invokeRestApi(httpRequest).pipe(
          map((res: IHttpSuccessPayload<any>) =>
            res.body.transferTypeValidation ?? null
          )
        ).pipe(
          map((res: any) => {
            eventEmitter.emit({
              eventName: 'transferTypeReceived',
              payload: {
                'ipiAllowed':res.ipiAllowed,
                'ftsAllowed':res.ftsAllowed,
                'ippAllowed':res.ippAllowed,
                'defaultChannel':res.defaultChannel
              },
            });

            return null;

          }),
          catchError((res: any) => {
            let error: any = {};
            // error['exchange_rate_fetch_error'] = res.error.ErrorMessage;
            // error=res.error.ErrorMessage
            return of(error);
          })
        );
      }
      else {
        let error: any = {};
      

        return of(error);
      }
    };
  }
}