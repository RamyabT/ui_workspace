import { IHttpErrorPayload } from '@fpx/core';
  
export interface DctransactiondtlsMaintanence {
  dctransactiondtls?: Dctransactiondtls[],
  totalRowCount?:number
  data?: Dctransactiondtls[],
  
}
export interface Dctransactiondtls  {
         transactionCurrency:string, 
         transactionCat:string, 
         transType:string, 
         balance:number, 
         transactionReference:string, 
         merchantId:string, 
         dbcrFlag:string, 
         transactionAmount:number, 
         transactionDescription:string, 
         valueDate:string, 
         transactionDate:string, 
         transactionRemarks:string, 
  }
  
  
 export interface DctransactiondtlsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
