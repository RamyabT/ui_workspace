import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailPctransactiondownloadfilterMaintanence {
  retailPctransactiondownloadfilter?: RetailPctransactiondownloadfilter[],
  totalRowCount?:number
  data?: RetailPctransactiondownloadfilter[],
  
}
export interface RetailPctransactiondownloadfilter  {
  }
  
  
 export interface RetailPctransactiondownloadfilterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
