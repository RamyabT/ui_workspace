import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoandisclosureMaintanence {
  loandisclosure?: Loandisclosure[],
  totalRowCount?:number
  data?: Loandisclosure[],
  
}
export interface Loandisclosure  {
         docName:string, 
         dateOfGeneration:string, 
         dateTo:string, 
         recentDocCount:string, 
         fileReference:string, 
         dateFrom:string, 
  }
  
  
 export interface LoandisclosureResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
