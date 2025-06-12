import { IHttpErrorPayload } from '@fpx/core';
  
export interface OktalandingformMaintanence {
  oktalandingform?: Oktalandingform[],
  totalRowCount?:number
  data?: Oktalandingform[],
  
}
export interface Oktalandingform  {
  }
  
  
 export interface OktalandingformResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
