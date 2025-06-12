import { IHttpErrorPayload } from '@fpx/core';
  
export interface PpcardBlockedMaintanence {
  ppcardBlocked?: PpcardBlocked[],
  totalRowCount?:number
  data?: PpcardBlocked[],
  
}
export interface PpcardBlocked  {
         autoCompleteFlag:string, 
         blockedDate:string, 
         currentStatus:string, 
         errorMessage:string, 
         requestReference:string, 
         errorCode:string, 
         customerCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
	     cardRefNumber:any, 
         authBy:string, 
         modifiedOn:string, 
         charges:number, 
         createdBy:string, 
         modifiedBy:string, 
         termsAndCondition:string, 
	     blockReason:any, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface PpcardBlockedResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
