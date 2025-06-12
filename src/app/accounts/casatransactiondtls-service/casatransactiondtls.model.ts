import { IHttpErrorPayload } from '@fpx/core';
  
export interface CasatransactiondtlsMaintanence {
  casatransactiondtls?: Casatransactiondtls[],
  totalRowCount?:number
  data?: Casatransactiondtls[],
  
}
export interface Casatransactiondtls  {
         transactionCurrency:string, 
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
  
  
 export interface CasatransactiondtlsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
