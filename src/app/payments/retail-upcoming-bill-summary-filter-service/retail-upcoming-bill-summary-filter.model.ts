import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailupcomingBillSummaryexfilterMaintanence {
  retailupcomingBillSummaryexfilter?: RetailupcomingBillSummaryexfilter[],
  totalRowCount?:number
  data?: RetailupcomingBillSummaryexfilter[],
  
}
export interface RetailupcomingBillSummaryexfilter  {
  }
  
  
 export interface RetailupcomingBillSummaryexfilterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
