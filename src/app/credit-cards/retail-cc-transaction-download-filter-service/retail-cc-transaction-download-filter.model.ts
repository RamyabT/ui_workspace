import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetaildctransactiondownloadfilterMaintanence {
  retaildctransactiondownloadfilter?: Retaildctransactiondownloadfilter[],
  totalRowCount?:number
  data?: Retaildctransactiondownloadfilter[],
  
}
export interface Retaildctransactiondownloadfilter  {
  }
  
  
 export interface RetaildctransactiondownloadfilterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
