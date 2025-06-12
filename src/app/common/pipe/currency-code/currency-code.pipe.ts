import { Pipe, PipeTransform } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';

@Pipe({ name: 'currencyCode' })
export class CurrencyCodePipe implements PipeTransform {
    transform(currency: number | string): string {
      return APPCONSTANTS.currencyCodeMap[currency] || currency;
    }
}