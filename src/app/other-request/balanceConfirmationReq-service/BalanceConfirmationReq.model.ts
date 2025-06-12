import { IHttpErrorPayload } from '@fpx/core';
import { BalanceConfirmationDetails } from '../balanceConfirmationDetails-service/BalanceConfirmationDetails.model';

  
export interface BalanceConfirmationReqMaintanence {
  BalanceConfirmationReq?: BalanceConfirmationReq[],
  totalRowCount?:number
  data?: BalanceConfirmationReq[],
  
}
export interface BalanceConfirmationReq  {
         date:string, 
         acknowledgement:string, 
	     address:any, 
         termsFlag:string, 
         errorMessage:string, 
         chargesAmount:number, 
         errorCode:string, 
         balanceConfirmationDetails:BalanceConfirmationDetails[], 
         emailId:string, 
         authOn:string, 
	     branch:any, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         modifiedBy:string, 
         letterFor:string, 
         deliveryOption:string, 
         remarks:string, 
  }
  
  
 export interface BalanceConfirmationReqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
