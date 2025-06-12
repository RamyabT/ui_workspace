import { IHttpErrorPayload } from '@fpx/core';
  
export interface AccountStmtReqMaintanence {
  accountStmtReq?: AccountStmtReq[],
  totalRowCount?:number
  data?: AccountStmtReq[],
  
}
export interface AccountStmtReq  {
	     reason:any, 
         termsFlag:string, 
         toDate:string, 
         errorMessage:string, 
         chargesAmount:number, 
         errorCode:string, 
         authOn:string, 
         updatedOn:string, 
	     accountNumber:any, 
         createdOn:string, 
         requestFor:string, 
         fromDate:string, 
         inventoryNumber:string, 
         otherReason:string, 
         authBy:string, 
         createdBy:string, 
	     currency:any, 
         modifiedBy:string, 
         deliveryOption:string, 
         addressInformation:any
  }
  
  
 export interface AccountStmtReqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
