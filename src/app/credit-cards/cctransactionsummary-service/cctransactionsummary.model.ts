import { IHttpErrorPayload } from '@fpx/core';
  
export interface CctransactionsummaryMaintanence {
  cctransactionsummary?: Cctransactionsummary[],
  totalRowCount?:number
  data?: Cctransactionsummary[],
  
}
export interface Cctransactionsummary  {
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
  
  
 export interface CctransactionsummaryResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
