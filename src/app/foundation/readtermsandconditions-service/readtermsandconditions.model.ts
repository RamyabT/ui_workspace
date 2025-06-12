import { IHttpErrorPayload } from '@fpx/core';
  
export interface ReadtermsandconditionsMaintanence {
  readtermsandconditions?: Readtermsandconditions[],
  totalRowCount?:number
  data?: Readtermsandconditions[],
  
}
export interface Readtermsandconditions  {
  }
  
  
 export interface ReadtermsandconditionsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
