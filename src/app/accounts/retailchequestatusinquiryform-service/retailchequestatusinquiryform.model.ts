import { IHttpErrorPayload } from '@fpx/core';

export interface RetailchequestatusinquiryformMaintanence {
  retailchequestatusinquiryform?: Retailchequestatusinquiryform[],
  totalRowCount?:number
  data?: Retailchequestatusinquiryform[],
  
}
export interface Retailchequestatusinquiryform  {
  }
  
  
 export interface RetailchequestatusinquiryformResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
