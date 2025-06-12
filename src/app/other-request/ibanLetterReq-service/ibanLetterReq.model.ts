import { IHttpErrorPayload } from '@fpx/core';
  
export interface IbanLetterReqMaintanence {
  ibanLetterReq?: IbanLetterReq[],
  totalRowCount?:number
  data?: IbanLetterReq[],
  
}
export interface IbanLetterReq  {
         termsFlag:string, 
         errorMessage:string, 
         chargesAmount:number, 
         errorCode:string, 
         authOn:string, 
         emailId:string, 
         updatedOn:string, 
	     accountNumber:any, 
         createdOn:string, 
         consentBox:string, 
         branchCode:string, 
         inventoryNumber:string, 
         authBy:string, 
         createdBy:string, 
         iBAN:string, 
         modifiedBy:string, 
         deliveryOption:string, 
         remarks:string, 
  }
  
  
 export interface IbanLetterReqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
