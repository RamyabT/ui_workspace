import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailtaxformfilterformMaintanence {
  retailtaxformfilterform?: Retailtaxformfilterform[],
  totalRowCount?:number
  data?: Retailtaxformfilterform[],
  
}
export interface Retailtaxformfilterform  {
  }
  
  
 export interface RetailtaxformfilterformResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
