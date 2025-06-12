import { IHttpErrorPayload } from '@fpx/core';
  
export interface ApplyloaninitiationMaintanence {
  applyloaninitiation?: Applyloaninitiation[],
  totalRowCount?:number
  data?: Applyloaninitiation[],
  
}
export interface Applyloaninitiation  {
  }
  
  
 export interface ApplyloaninitiationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
