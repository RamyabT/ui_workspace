import { IHttpErrorPayload } from '@fpx/core';
  
export interface CcunblockedMaintanence {
  ccunblocked?: Ccunblocked[],
  totalRowCount?:number
  data?: Ccunblocked[],
  
}
export interface Ccunblocked  {
         entityCode:string, 
         autoCompleteFlag:string, 
         requestReference:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         otherReason:string, 
	     cardRefNumber:any, 
         charges:number, 
         authBy:string, 
         modifiedOn:string, 
         unblockedDate:string, 
         terms:string, 
         createdBy:string, 
         modifiedBy:string, 
	     ccUnblockReason:any, 
	     blockReason:any, 
         remarks:string, 
         status:string, 
         currency:any
  }
  
  
 export interface CcunblockedResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
