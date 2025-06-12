import { IHttpErrorPayload } from '@fpx/core';
  
export interface UserccrestrictionreqMaintanence {
  userccrestrictionreq?: Userccrestrictionreq[],
  totalRowCount?:number
  data?: Userccrestrictionreq[],
  
}
export interface Userccrestrictionreq  {
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
  
  
 export interface UserccrestrictionreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
