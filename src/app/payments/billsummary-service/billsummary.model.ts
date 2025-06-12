import { IHttpErrorPayload } from '@fpx/core';
  
export interface BillsummaryMaintanence {
  billsummary?: Billsummary[],
  totalRowCount?:number
  data?: Billsummary[],
  
}
export interface Billsummary  {
         amount:number, 
         debitAccount:string, 
         initiationDate:string, 
         transactionDate:string, 
         billerName:string, 
         tranRef:string, 
         currencyCode:string, 
         flowInstanceId:string, 
         paymentType:string, 
         status:string, 
         transferReference:string,
         serviceCode:string,
         statusType:string
  }
  
  
 export interface BillsummaryResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
