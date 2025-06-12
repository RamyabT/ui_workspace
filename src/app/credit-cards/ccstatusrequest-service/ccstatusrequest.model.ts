import { IHttpErrorPayload } from '@fpx/core';
  
export interface CcstatusrequestMaintanence {
  ccstatusrequest?: Ccstatusrequest[],
  totalRowCount?:number
  data?: Ccstatusrequest[],
  
}
export interface Ccstatusrequest  {
	     reason:any, 
         entityCode:string, 
         autoCompleteFlag:string, 
         currentStatus:string, 
         requestReference:string, 
         errorMessage:string, 
         errorCode:string, 
         customerCode:string, 
         chargesAmount:number, 
         updtOn:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         otherReason:string, 
	     cardRefNumber:any, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         terms:string, 
         modifiedBy:string, 
	     creditCard:any, 
	     blockReason:any, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface CcstatusrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
