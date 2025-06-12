 



import { IHttpErrorPayload } from '@fpx/core';

export class Transactionhistorymaintainence {
  wallettransactiondtls?: wallettransactiondtls[]
  totalRowCount?:number
  data?: wallettransactiondtls[]
}


export interface wallettransactiondtls{
    transactionCurrency: string
    transactionReference: string
    transactionDateTime: string
    transactionDescription: string
    valueDate: string
    accountNumber: string
    transactionDate: string
    R: string
    debitCreditFlag: string
    balance: string
    transType: string
    exchangeRate: number,
    transactionAmount: string
    transactionCategory: string
    remarks: string
}


export interface TransactionhistoryResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
