import { IHttpErrorPayload } from '@fpx/core';
  
export interface LinkinvestmentreqMaintanence {
  linkinvestmentreq?: Linkinvestmentreq[],
  totalRowCount?:number
  data?: Linkinvestmentreq[],
  
}
export interface Linkinvestmentreq  {
         lastName:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         dob:string, 
         postalCode:string, 
         tenantId:string, 
         customerCode:string, 
         authOn:string, 
         modifiedBy:string, 
         clientNumber:string, 
         createdOn:string, 
  }
  
  
 export interface LinkinvestmentreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
