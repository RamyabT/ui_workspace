import { IHttpErrorPayload } from '@fpx/core';
  
export interface PctransactiondtlsMaintanence {
  pctransactiondtls?: Pctransactiondtls[],
  totalRowCount?:number
  data?: Pctransactiondtls[],
  
}
export interface Pctransactiondtls  {
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
  
  
 export interface PctransactiondtlsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
