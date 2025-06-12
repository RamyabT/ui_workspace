import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoantransactiondtlsMaintanence {
  loantransactiondtls?: Loantransactiondtls[],
  totalRowCount?:number
  data?: Loantransactiondtls[],
  
}
export interface Loantransactiondtls  {
         transactionCurrency:string, 
         transactionDateTime:string, 
         transactionReference:string, 
         instrumentId:string, 
         debitOrcreditFlag:string, 
         transactionDescription:string, 
         transactionDate:string, 
         transactionType:string, 
         balance:number, 
         beneficiary:string, 
         merchantId:string, 
         transactionAmount:number, 
         transactionCategory:string, 
         valuedate:string, 
         remarks:string, 
  }
  
  
 export interface LoantransactiondtlsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
