import { IHttpErrorPayload } from '@fpx/core';
  
export interface BillerMaintanence {
  biller?: Biller[],
  totalRowCount?:number
  data?: Biller[],
  
}
export interface Biller  {
         billerId:string, 
         accountValidationAllowed:string, 
         postpaid:string, 
         prepaid:string, 
         authOn:string, 
         createdOn:string, 
         enabled:string, 
         modifiedOn:string, 
         authBy:string, 
         cbsAccount:string, 
         createdBy:string, 
         name:string, 
         invoiceAllowed:string, 
	     currency:any, 
         modifiedBy:string, 
         shortName:string, 
	     category:any, 
         billerIcon:string, 
         smartPayAllowed:string, 
	     billerControls:any, 
  }
  
  
 export interface BillerResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
