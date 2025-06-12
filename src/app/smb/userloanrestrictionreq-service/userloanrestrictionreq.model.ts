import { IHttpErrorPayload } from '@fpx/core';
  
export interface UserloanrestrictionreqMaintanence {
  userloanrestrictionreq?: Userloanrestrictionreq[],
  totalRowCount?:number
  data?: Userloanrestrictionreq[],
  
}
export interface Userloanrestrictionreq  {
         inquiryAllowed:string, 
         transactionAllowed:string, 
         inventoryNumber:string, 
         requestAllowed:string, 
         approvalRequired:string, 
         accountType:string, 
         tenantId:string, 
         customerCode:string, 
         accountNumber:string, 
         userId:string, 
  }
  
  
 export interface UserloanrestrictionreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
