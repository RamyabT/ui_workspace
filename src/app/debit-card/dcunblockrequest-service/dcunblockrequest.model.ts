import { IHttpErrorPayload } from '@fpx/core';
  
export interface DcunblockrequestMaintanence {
  dcunblockrequest?: Dcunblockrequest[],
  totalRowCount?:number
  data?: Dcunblockrequest[],
  
}
export interface Dcunblockrequest  {
         cbxrTerms:string, 
         autoCompleteFlag:string, 
	     dcUnblockReason:any, 
         requestReference:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         unblockDate:string, 
         inventoryNumber?:string, 
	     cardRefNumber:any, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
	     blockreason:any, 
         modifiedBy:string, 
         remarks:string, 
         status:string, 
         currency:any,
         charges:any
  }
  
  
 export interface DcunblockrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
