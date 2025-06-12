import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoanclosuresimulationMaintanence {
  loanclosuresimulation?: Loanclosuresimulation[],
  totalRowCount?:number
  data?: Loanclosuresimulation[],
  
}
export interface Loanclosuresimulation  {
  }
  
  
 export interface LoanclosuresimulationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
