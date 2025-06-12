import { IHttpErrorPayload } from '@fpx/core';
  
export interface ResumesuccessMaintanence {
  resumesuccess?: Resumesuccess[],
  totalRowCount?:number
  data?: Resumesuccess[],
  
}
export interface Resumesuccess  {
         processId:string, 
  }
  
  
 export interface ResumesuccessResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
