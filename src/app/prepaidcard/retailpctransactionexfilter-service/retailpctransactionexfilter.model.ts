import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailpctransactionexfilterMaintanence {
  retailpctransactionexfilter?: Retailpctransactionexfilter[],
  totalRowCount?:number
  data?: Retailpctransactionexfilter[],
  
}
export interface Retailpctransactionexfilter  {
  }
  
  
 export interface RetailpctransactionexfilterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
