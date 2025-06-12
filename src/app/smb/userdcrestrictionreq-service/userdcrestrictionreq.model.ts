import { IHttpErrorPayload } from '@fpx/core';
  
export interface UserdcrestrictionreqMaintanence {
  userdcrestrictionreq?: Userdcrestrictionreq[],
  totalRowCount?:number
  data?: Userdcrestrictionreq[],
  
}
export interface Userdcrestrictionreq  {
         inquiryAllowed:string, 
         transactionAllowed:string, 
         inventoryNumber:string, 
         requestAllowed:string, 
         approvalRequired:string, 
         cardRef:string, 
         tenantId:string, 
         cardType:string, 
         customerCode:string, 
         userId:string, 
  }
  
  
 export interface UserdcrestrictionreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
