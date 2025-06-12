import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailloantrandtlsfilterformMaintanence {
  retailloantrandtlsfilterform?: Retailloantrandtlsfilterform[],
  totalRowCount?:number
  data?: Retailloantrandtlsfilterform[],
  
}
export interface Retailloantrandtlsfilterform  {
  }
  
  
 export interface RetailloantrandtlsfilterformResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
