import { IHttpErrorPayload } from '@fpx/core';
  
export interface UsercasarestrictionreqMaintanence {
  usercasarestrictionreq?: Usercasarestrictionreq[],
  totalRowCount?:number
  data?: Usercasarestrictionreq[],
  
}
export interface Usercasarestrictionreq  {
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
  
  
 export interface UsercasarestrictionreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
