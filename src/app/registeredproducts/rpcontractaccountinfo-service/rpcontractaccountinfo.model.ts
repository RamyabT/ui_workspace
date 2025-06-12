import { IHttpErrorPayload } from '@fpx/core';
  
export interface RpcontractaccountinfoMaintanence {
  rpcontractaccountinfo?: Rpcontractaccountinfo[],
  totalRowCount?:number
  data?: Rpcontractaccountinfo[],
  
}
export interface Rpcontractaccountinfo  {
         depositAmount:number, 
         interestRate:string, 
         inventoryNumber:string, 
         productId:string, 
         termsInMonths:string, 
         segmentId:string, 
         tenantId:string, 
         fromAccount:string, 
	     intendedUse:any, 
         accountNumber:string, 
         accountUsedBy:string, 
  }
  
  
 export interface RpcontractaccountinfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
