import { IHttpErrorPayload } from '@fpx/core';
  
export interface InvalidatenpssMaintanence {
  invalidatenpss?: Invalidatenpss[],
  totalRowCount?:number
  data?: Invalidatenpss[],
  
}
export interface Invalidatenpss  {
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         errorDesc:string, 
         createdBy:string, 
         termsFlag:string, 
         errorMessage:string, 
         errorCode:string, 
         customerCode:string, 
         modifiedBy:string, 
         authOn:string, 
         createdOn:string, 
  }
  
  
 export interface InvalidatenpssResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
