import { IHttpErrorPayload } from '@fpx/core';
  
export interface DcstatusrequestMaintanence {
  dcstatusrequest?: Dcstatusrequest[],
  totalRowCount?:number
  data?: Dcstatusrequest[],
  
}
export interface Dcstatusrequest  {
	     debitcardblockreason:any, 
         entityCode:string, 
         autoCompleteFlag:string, 
         currentStatus:string, 
         requestReference:string, 
         errorMessage:string, 
         errorCode:string, 
         customerCode:string, 
         updtOn:string, 
         authOn:string, 
         createdOn:string, 
	     debitcard:any, 
         inventoryNumber:string, 
         otherReason:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         terms:string, 
         unblockreason:string, 
         modifiedBy:string, 
         remarks:string, 
         status:string,
         currency:any,
         charges:any 
  }
  
  
 export interface DcstatusrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
