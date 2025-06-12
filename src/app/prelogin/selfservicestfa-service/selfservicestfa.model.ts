import { IHttpErrorPayload } from '@fpx/core';
  
export interface SelfservicestfaMaintanence {
  selfservicestfa?: Selfservicestfa[],
  totalRowCount?:number
  data?: Selfservicestfa[],
  
}
export interface Selfservicestfa  {
         serviceCode:string, 
         reqRef:string, 
         otp:string, 
  }
  
  
 export interface SelfservicestfaResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
