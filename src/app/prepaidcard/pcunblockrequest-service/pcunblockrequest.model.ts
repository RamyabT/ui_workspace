import { IHttpErrorPayload } from '@fpx/core';
  
export interface PcunblockrequestMaintanence {
  pcunblockrequest?: Pcunblockrequest[],
  totalRowCount?:number
  data?: Pcunblockrequest[],
  
}
export interface Pcunblockrequest  {
	     reason:any, 
         entityCode:string, 
         autoCompleteFlag:string, 
         termsFlag:string, 
         requestReference:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
	     cardReference:any, 
         createdOn:string, 
         unblockDate:string, 
         inventoryNumber:string, 
	     otherReason:any, 
         charges:number, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         modifiedBy:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface PcunblockrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
