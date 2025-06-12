import { IHttpErrorPayload } from '@fpx/core';
  
export interface FatcaRejectedMaintanence {
  fatcaRejected?: FatcaRejected[],
  totalRowCount?:number
  data?: FatcaRejected[],
  
}
export interface FatcaRejected  {
  }
  
  
 export interface FatcaRejectedResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
