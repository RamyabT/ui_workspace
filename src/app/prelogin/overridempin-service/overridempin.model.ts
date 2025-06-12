import { IHttpErrorPayload } from '@fpx/core';
  
export interface OverridempinMaintanence {
  overridempin?: Overridempin[],
  totalRowCount?:number
  data?: Overridempin[],
  
}
export interface Overridempin  {
  }
  
  
 export interface OverridempinResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
