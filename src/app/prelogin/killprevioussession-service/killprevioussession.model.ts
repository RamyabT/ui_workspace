import { IHttpErrorPayload } from '@fpx/core';
  
export interface KillprevioussessionMaintanence {
  killprevioussession?: Killprevioussession[],
  totalRowCount?:number
  data?: Killprevioussession[],
  
}
export interface Killprevioussession  {
         inventoryNumber?:string, 
         ticket?:any,
         reqRef:string,
         decision:string
  }
  
  
 export interface KillprevioussessionResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
