import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardNumberMask'
})
export class CreditCardNumberMaskPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let creditCardNumber = value || '';
    if (creditCardNumber.length > 4) {
      creditCardNumber = creditCardNumber.slice(-4);
    }
    return `•••• ${creditCardNumber}`;
  }

}
