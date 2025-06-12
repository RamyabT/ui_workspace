import { ChangeDetectorRef, EventEmitter, Injectable, Optional } from "@angular/core";
import { Casaaccount } from "../../foundation/casaaccount-service/casaaccount.model";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";

@Injectable()
export class ExchangeRateValidator {
  constructor(
    private _httpProvider: HttpProviderService) {
  }
  exchangeRateValidation(

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

      console.log('Amount checked isss', control.value.amount);
      let currencyInContext = control.value.currencyCode;
      let payload: any;
      let debitAmount: any;
      let creditAmount: any;
      let exchangeRate: any;
      let againstRate: any;
      let baseRate: any;
      let paymentFlag: any;
      let accountBalance: any;
      let scheduleType: any;
      let beneficiaryId: any;
      let toAccCurr:any;
      let fromAccCurr:any;
      let maxTranAmount: any;
      let minTranAmount: any;
      let maxDailyLimit: any;
      let equivalentAmount: any;

      if (control.value.amount > 0 && control.value.amount
        && currencyInContext) {

        console.log('From currency', dependentFieldMap.get('fromCurrency'));
        console.log('To currency', dependentFieldMap.get('againstCurrency'));
        console.log('Balance', dependentFieldMap.get('accountBalance'));
        accountBalance = dependentFieldMap.get('accountBalance');
        scheduleType = dependentFieldMap.get('scheduleType');
        beneficiaryId = dependentFieldMap.get('beneficiaryId');
        toAccCurr=dependentFieldMap.get('againstCurrency');
        fromAccCurr=dependentFieldMap.get('fromCurrency');
        equivalentAmount = dependentFieldMap.get('equivalentAmount');
        if (currencyInContext == dependentFieldMap.get('fromCurrency')) {
          payload = {
            "fromCurrency": currencyInContext,
            "toCurrency": dependentFieldMap.get('againstCurrency'),
            "amount": control.value.amount,
            "beneId":beneficiaryId,
            "toAccCurr": toAccCurr,
            "fromAccCurr": fromAccCurr
          }
          debitAmount = control.value.amount;
          paymentFlag = 'D';
        }
        else if (currencyInContext == dependentFieldMap.get('againstCurrency')) {
          payload = {
            "fromCurrency": currencyInContext,
            "toCurrency": dependentFieldMap.get('fromCurrency'),
            "amount": control.value.amount,
            "beneId":beneficiaryId,
            "toAccCurr": toAccCurr,
            "fromAccCurr": fromAccCurr,
            "equivalentAmount": equivalentAmount
          }
          creditAmount = control.value.amount;
          paymentFlag = 'C';
        }
        else{
          payload = {
            "fromCurrency": currencyInContext,
            "toCurrency": dependentFieldMap.get('fromCurrency'),
            "amount": control.value.amount,
            "beneId":beneficiaryId,
            "toAccCurr": toAccCurr,
            "fromAccCurr": fromAccCurr
          }
          creditAmount = control.value.amount;
          paymentFlag = 'D';

        }

        console.log(dependentFieldMap.get('fromCurrency'), dependentFieldMap.get('againstCurrency'))
        
        if (dependentFieldMap.get('fromCurrency') !== dependentFieldMap.get('againstCurrency')) {
          const httpRequest = new HttpRequest();
          httpRequest.setMethod('POST');
          httpRequest.setResource('/exchangerate');
          let bodyContent = { "exchangerate": payload };
          httpRequest.setBody(bodyContent);
          httpRequest.setContextPath('Common');
          httpRequest.addHeaderParamter('serviceCode', 'DEPFXRATE');
          return this._httpProvider.invokeRestApi(httpRequest).pipe(
            map((res: IHttpSuccessPayload<any>) =>
              res.body.exchangerate ?? null
            )
          ).pipe(
            map((res: any) => {
              console.log('Rates received ', res);
              if (paymentFlag == 'D') {
                creditAmount = res.equivalentAmount;
                console.log('Assigning to credit amount', res.equivalentAmount);
              }
              else {
                debitAmount = res.equivalentAmount;
                console.log('Assigning to debit amount', res.equivalentAmount);
              }
              exchangeRate = res.exchangeRate;
              baseRate = res.baseCurrencyRate;
              againstRate = res.againstRate;
              minTranAmount = res.minTranAmount;
              maxTranAmount = res.maxTranAmount;
              maxDailyLimit = res.maxDailyLimit;
              equivalentAmount = res.equivalentAmount;
              accountBalance = dependentFieldMap.get('accountBalance');
              if (scheduleType == 2 || scheduleType == 3) {
                eventEmitter.emit({
                  eventName: 'exchangeRateReceived', payload: {
                    'debitAmount': debitAmount,
                    'creditAmount': creditAmount,
                    'exchangeRate': exchangeRate,
                    'baseRate': baseRate,
                    'againstRate': againstRate,
                    'minTranAmount': minTranAmount,
                    'maxTranAmount': maxTranAmount,
                    'maxDailyLimit': maxDailyLimit,
                    'equivalentAmount': equivalentAmount
                  }
                })
                return null;
              }
              else if (debitAmount > accountBalance) {
                eventEmitter.emit({
                  eventName: 'exchangeRateReceived', payload: {
                    'debitAmount': debitAmount,
                    'creditAmount': creditAmount,
                    'exchangeRate': exchangeRate,
                    'baseRate': baseRate,
                    'againstRate': againstRate,
                    'minTranAmount': minTranAmount,
                    'maxTranAmount': maxTranAmount,
                    'maxDailyLimit': maxDailyLimit,
                    'equivalentAmount': equivalentAmount
                  }
                })
                return { 'insufficient_balance_error': true };
              }


            eventEmitter.emit({
              eventName: 'exchangeRateReceived',
              payload: {
                'debitAmount': debitAmount,
                'creditAmount': creditAmount,
                'exchangeRate': exchangeRate,
                'baseRate': baseRate,
                'againstRate': againstRate,
                'minTranAmount': minTranAmount,
                'maxTranAmount': maxTranAmount,
                'maxDailyLimit': maxDailyLimit,
                'equivalentAmount' :equivalentAmount
              },
            });

            return null;

            }),
            catchError((res: any) => {
              let error: any = {};

              // error=res.error.exchangeRate.ErrorMessage
              if (res.error.exchangerate) {
                if (paymentFlag == 'D') {
                  creditAmount = res.error.exchangerate.equivalentAmount;
                  console.log('Assigning to credit amount', res.error.exchangerate.equivalentAmount);
                }
                else {
                  debitAmount = res.error.exchangerate.equivalentAmount;
                  console.log('Assigning to debit amount', res.error.exchangerate.equivalentAmount);
                }
                exchangeRate = res.error.exchangerate.exchangeRate;
                baseRate = res.error.exchangerate.baseCurrencyRate;
                againstRate = res.error.exchangerate.againstRate;
                maxTranAmount = res.error.exchangerate.maxTranAmount;
                minTranAmount = res.error.exchangerate.minTranAmount;
                maxDailyLimit = res.error.exchangerate.maxDailyLimit;
                equivalentAmount = res.error.exchangerate.equivalentAmount;
                eventEmitter.emit({
                  eventName: 'exchangeRateReceived', payload: {
                    'debitAmount': debitAmount,
                    'creditAmount': creditAmount,
                    'exchangeRate': exchangeRate,
                    'baseRate': baseRate,
                    'againstRate': againstRate,
                    'minTranAmount': minTranAmount,
                    'maxTranAmount': maxTranAmount,
                    'maxDailyLimit': maxDailyLimit,
                    'equivalentAmount': equivalentAmount
                  }
                })
              }
              error['exchange_rate_fetch_error'] = res.error.ErrorMessage;
              return of(error);
            })
          );
        } else {

          let res = {
            "baseCurrencyRate": "1",
            "maxDailyLimit": "999999999999",
            "baseCurrAmount": control.value.amount,
            "debitCurrency": "CAD",
            "exchangeRate": "1",
            "equivalentAmount": control.value.amount,
            "minTranAmount": "0.1",
            "maxTranAmount": "999999999999",
            "creditCurrency": "CAD",
            "baseCurrency": "CAD",
            "baseRate": "1"
          }
          console.log('Rates received ', res);
          if (paymentFlag == 'D') {
            creditAmount = res.equivalentAmount;
            console.log('Assigning to credit amount', res.equivalentAmount);
          }
          else {
            debitAmount = res.equivalentAmount;
            console.log('Assigning to debit amount', res.equivalentAmount);
          }
          exchangeRate = res.exchangeRate;
          baseRate = res.baseCurrencyRate;
          // againstRate = res.againstRate;
          minTranAmount = res.minTranAmount;
          maxTranAmount = res.maxTranAmount;
          maxDailyLimit = res.maxDailyLimit;
          equivalentAmount = res.equivalentAmount;
          accountBalance = dependentFieldMap.get('accountBalance');
          if (scheduleType == 2 || scheduleType == 3) {
            eventEmitter.emit({
              eventName: 'exchangeRateReceived', payload: {
                'debitAmount': debitAmount,
                'creditAmount': creditAmount,
                'exchangeRate': exchangeRate,
                'baseRate': baseRate,
                'againstRate': againstRate,
                'minTranAmount': minTranAmount,
                'maxTranAmount': maxTranAmount,
                'maxDailyLimit': maxDailyLimit,
                'equivalentAmount': equivalentAmount
              }
            })
            return of(null);
          }
          else if (debitAmount > accountBalance) {
            eventEmitter.emit({
              eventName: 'exchangeRateReceived', payload: {
                'debitAmount': debitAmount,
                'creditAmount': creditAmount,
                'exchangeRate': exchangeRate,
                'baseRate': baseRate,
                'againstRate': againstRate,
                'minTranAmount': minTranAmount,
                'maxTranAmount': maxTranAmount,
                'maxDailyLimit': maxDailyLimit,
                'equivalentAmount': equivalentAmount
              }
            })
            return of({ 'insufficient_balance_error': true });
          }


          eventEmitter.emit({
            eventName: 'exchangeRateReceived',
            payload: {
              'debitAmount': debitAmount,
              'creditAmount': creditAmount,
              'exchangeRate': exchangeRate,
              'baseRate': baseRate,
              'againstRate': againstRate,
              'minTranAmount': minTranAmount,
              'maxTranAmount': maxTranAmount,
              'maxDailyLimit': maxDailyLimit,
              'equivalentAmount': equivalentAmount
            },
          });

          return of(null);
        }
      }
      else {
        let error: any = {};
        if (!control.value.amount || control.value.amount == 0 || control.value.amount < 0) {
          error['zero_value_error'] = true;
          eventEmitter.emit({
            eventName: 'exchangeRateReceived',
            payload: {
              zeroValue: 'error'
            }
          });
        }

        return of(error);
      }
    };
  }
}