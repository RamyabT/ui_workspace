import { ChangeDetectorRef, EventEmitter, Injectable, Optional } from "@angular/core";
// import { Casaaccount } from "../casaaccount-service/casaaccount.model";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";

@Injectable()
export class ChargesValidator {
  constructor(
    private _httpProvider: HttpProviderService) {
  }
  chargesValidation(

    eventEmitter: EventEmitter<{
      eventName: string;
      payload: any;

    }>,
    dependentFieldMap: Map<string, string>
  ): AsyncValidatorFn {
    console.warn('Exchange Rate validation begins');

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
      let fromAccount: any;
      let toAccount: any;
      let totalAmount: any;
      let accountBalance:any
      if (control.value) {
         accountBalance= dependentFieldMap.get('accountBalance');
         amount=dependentFieldMap.get('amount') 
        console.log('From currency', dependentFieldMap.get('amount'));
        payload = {
          amount: dependentFieldMap.get('amount'),
          currency: dependentFieldMap.get('currency'),
          serviceCode: dependentFieldMap.get('serviceCode'),
          chargesBorneBy: control.value,
          fromAccount: dependentFieldMap.get('fromAccount'),
          toAccount: dependentFieldMap.get('toAccount'),


        }
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setResource('/charges');
        // let bodyContent = { payload };
        httpRequest.setBody(payload);
        httpRequest.setContextPath('WorkflowService');
        httpRequest.addHeaderParamter('serviceCode', 'RETAILCHARGESERVICE');
        return this._httpProvider.invokeRestApi(httpRequest).pipe(
          map((res: IHttpSuccessPayload<any>) =>
            res.body.ChargeServiceResponse ?? null
          )
        ).pipe(
          map((res: any) => {
            if (control.value == 1 || control.value == 2) {
              
             
              if ((Number(res.totalEquivalentChargeAmtTranCcy) + amount) > accountBalance) {
                console.log('Rates received ', res);
                eventEmitter.emit({
                  eventName: 'chargesRateReceived',
                  payload: {
                    'totalChargeAmnBaseCurr': Number(res.totalEquivalentChargeAmtBaseCcy),
                    'baseCurrency': res.baseCurrency,
                    'totalChargeChargeCcy': res.totalChargeChargeCcy,
                    'chargeCurrency': res.chargeCurrency,
                    'insufficientBalance':"insufficientBalance",
                    "totalAmount":(Number(res.totalEquivalentChargeAmtTranCcy) + amount)
                  },
                });

                return { 'insufficient_balance_error': true };
              }
            }

            console.log('Rates received ', res);
            eventEmitter.emit({
              eventName: 'chargesRateReceived',
              payload: {
                'totalChargeAmnBaseCurr': Number(res.totalEquivalentChargeAmtBaseCcy),
                'baseCurrency': res.baseCurrency,
                'totalChargeChargeCcy': res.totalChargeChargeCcy,
                'chargeCurrency': res.chargeCurrency
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