import { IHttpErrorPayload } from '@fpx/core';
  
export interface UserdeprestrictionreqMaintanence {
  userdeprestrictionreq?: Userdeprestrictionreq[],
  totalRowCount?:number
  data?: Userdeprestrictionreq[],
  
}
export interface Userdeprestrictionreq  {
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
  
  
 export interface UserdeprestrictionreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
