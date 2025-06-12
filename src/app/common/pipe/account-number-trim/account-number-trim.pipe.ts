import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'accountNumberTrim' })
export class AccountNumberTrimPipe implements PipeTransform {
    transform(accountNumber: string): string {
      if(accountNumber.length >= 14){
        return accountNumber.slice(2);
      }
      return accountNumber;
    }
}