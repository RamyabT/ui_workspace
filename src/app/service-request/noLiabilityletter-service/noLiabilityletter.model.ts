import { IHttpErrorPayload } from '@fpx/core';
  
export interface NoLiabilityletterMaintanence {
  noLiabilityletter?: NoLiabilityletter[],
  totalRowCount?:number
  data?: NoLiabilityletter[],
  
}
export interface NoLiabilityletter  {
         date:string, 
         addressedTo:string, 
         acknowledgement:string, 
         termsFlag:string, 
         errorMessage:string, 
         chargesAmount:number, 
         errorCode:string, 
         authOn:string, 
         updatedOn:string, 
         createdOn:string, 
	     Reason:string, 
         inventoryNumber:string, 
         otherReason:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         modifiedBy:string, 
         deliveryOption:string, 
         remarks:string, 
         liabilitytype:string, 
  }
  
  
 export interface NoLiabilityletterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
