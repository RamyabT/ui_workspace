import { IHttpErrorPayload } from '@fpx/core';
  
export interface NpssproxyMaintanence {
  npssproxy?: Npssproxy[],
  totalRowCount?:number
  data?: Npssproxy[],
  
}
export interface Npssproxy  {
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         errorDesc:string, 
         createdBy:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         modifiedBy:string, 
         authOn:string, 
         createdOn:string, 
         email:string, 
  }
  
  
 export interface NpssproxyResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
