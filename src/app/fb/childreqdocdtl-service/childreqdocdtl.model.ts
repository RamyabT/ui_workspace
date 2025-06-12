import { IHttpErrorPayload } from '@fpx/core';
  
export interface ChildreqdocdtlMaintanence {
  childreqdocdtl?: Childreqdocdtl[],
  totalRowCount?:number
  data?: Childreqdocdtl[],
  
}
export interface Childreqdocdtl  {
         inventoryNumber:string, 
         fileName:string, 
         docInvNumber:string, 
         tenantId:string, 
         serialNo:number, 
  }
  
  
 export interface ChildreqdocdtlResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
