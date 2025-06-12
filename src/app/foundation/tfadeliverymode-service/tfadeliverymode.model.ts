import { IHttpErrorPayload } from '@fpx/core';
  
export interface TfadeliverymodeMaintanence {
  tfadeliverymode?: Tfadeliverymode[],
  totalRowCount?:number
  data?: Tfadeliverymode[],
  
}
export interface Tfadeliverymode  {
         modifiedOn:string, 
         invNum:string, 
         deliveryMode:string, 
         createdBy:string, 
         reqRef:string, 
         modifiedBy:string, 
         userId:string, 
         createdOn:string, 
  }
  
  
 export interface TfadeliverymodeResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
