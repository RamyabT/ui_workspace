import { IHttpErrorPayload } from '@fpx/core';
  
export interface PreloginverifytfaMaintanence {
  preloginverifytfa?: Preloginverifytfa[],
  totalRowCount?:number
  data?: Preloginverifytfa[],
  
}
export interface Preloginverifytfa  {
  }
  
  
 export interface PreloginverifytfaResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
