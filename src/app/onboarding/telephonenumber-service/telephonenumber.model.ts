import { IHttpErrorPayload } from '@fpx/core';
  
export interface TelephonenumberMaintanence {
  telephonenumber?: Telephonenumber[],
  totalRowCount?:number
  data?: Telephonenumber[],
  
}
export interface Telephonenumber  {
         extensionNumber:string, 
         iSOCode:string, 
         landlineNumber:string, 
  }
  
  
 export interface TelephonenumberResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
