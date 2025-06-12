import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetaildctransactionexfilterMaintanence {
  retaildctransactionexfilter?: Retaildctransactionexfilter[],
  totalRowCount?:number
  data?: Retaildctransactionexfilter[],
  
}
export interface Retaildctransactionexfilter  {
  }
  
  
 export interface RetaildctransactionexfilterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
