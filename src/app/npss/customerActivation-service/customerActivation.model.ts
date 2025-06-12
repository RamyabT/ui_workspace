import { IHttpErrorPayload } from '@fpx/core';
  
export interface CustomerActivationMaintanence {
  customerActivation?: CustomerActivation[],
  totalRowCount?:number
  data?: CustomerActivation[],
  
}
export interface CustomerActivation  {
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         errorDesc:string, 
         createdBy:string, 
         termsFlag:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         modifiedBy:string, 
         authOn:string, 
         createdOn:string, 
  }
  
  
 export interface CustomerActivationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
