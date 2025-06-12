import { IHttpErrorPayload } from '@fpx/core';

export interface PrepaidLoadMoneyMaintanence {
  prepaidLoadMoney?: PrepaidLoadMoney[],
  totalRowCount?: number
  data?: PrepaidLoadMoney[],

}
export interface PrepaidLoadMoney {
  debitCurrency: any,
  termsFlag: string,
  customerCode: string,
  errorCode: string,
  authOn: string,
  createdOn: string,
  inventoryNumber: string,
  modifiedOn: string,
  exchangeRate: number,
  currency: any,
  modifiedBy: string,
  amount: number,
  baseEquiAmount: number,
  entityCode: string,
  autoCompleteFlag: string,
  errorMessage: string,
  debitAmount: number,
  accountNumber: any,
  charges: number,
  authBy: string,
  cardRefNumber: any,
  baseRate: number,
  createdBy: string,
  creditCurrency: any,
  creditAmount: number,
  remarks: string,
  dummyControl?:string
}


export interface PrepaidLoadMoneyResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
