import { IHttpErrorPayload } from '@fpx/core';
  
export interface UserpcrestrictionreqMaintanence {
  userpcrestrictionreq?: Userpcrestrictionreq[],
  totalRowCount?:number
  data?: Userpcrestrictionreq[],
  
}
export interface Userpcrestrictionreq  {
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
  
  
 export interface UserpcrestrictionreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
