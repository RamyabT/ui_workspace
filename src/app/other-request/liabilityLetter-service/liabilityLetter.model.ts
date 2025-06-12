import { IHttpErrorPayload } from '@fpx/core';
import { LiabilityReason } from '../liabilityReason-service/liabilityReason.model';
  
export interface LiabilityLetterMaintanence {
  liabilityLetter?: LiabilityLetter[],
  totalRowCount?:number
  data?: LiabilityLetter[],
  
}
export interface LiabilityLetter  {
         addressedTo:string, 
         serviceReqDeliveryOption:string, 
         acknowledgement:string, 
         termsFlag:string, 
         errorMessage:string, 
         asonDate:string, 
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
         remarks:string, 
         liabilitytype:string, 
  }
  
  
 export interface LiabilityLetterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
