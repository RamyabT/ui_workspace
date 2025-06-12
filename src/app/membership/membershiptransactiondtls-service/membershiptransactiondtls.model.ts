import { IHttpErrorPayload } from '@fpx/core';
  
export interface MembershiptransactiondtlsMaintanence {
  membershiptransactiondtls?: Membershiptransactiondtls[],
  totalRowCount?:number
  data?: Membershiptransactiondtls[],
  
}
export interface Membershiptransactiondtls  {
         transactionCurrency:string, 
         transactionDateTime:string, 
         transactionReference:string, 
         instrumentId:string, 
         closingBalance:number, 
         debitOrcreditFlag:string, 
         transactionDescription:string, 
         transactionDate:string, 
         accountNumber:string, 
         transactionType:string, 
         merchantId:string, 
         transactionAmount:number, 
         tenantId:string, 
         transactionCategory:string, 
  }
  
  
 export interface MembershiptransactiondtlsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
