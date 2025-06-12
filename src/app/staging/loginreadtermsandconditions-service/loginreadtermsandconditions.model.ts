import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoginReadtermsandconditionsMaintanence {
  Loginreadtermsandconditions?: LoginReadtermsandconditions[],
  totalRowCount?:number
  data?: LoginReadtermsandconditions[],
  
}
export interface LoginReadtermsandconditions  {
  }
  
  
 export interface LoginReadtermsandconditionsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
