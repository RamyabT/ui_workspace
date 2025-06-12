import { IHttpErrorPayload } from '@fpx/core';
  
export interface ChildreqaccountdtlMaintanence {
  childreqaccountdtl?: Childreqaccountdtl[],
  totalRowCount?:number
  data?: Childreqaccountdtl[],
  
}
export interface Childreqaccountdtl  {
	     debitAccNo:any, 
         inventoryNumber:string, 
	     noOfInstallments:any, 
         recurringAmount:any, 
         endDate:string, 
	     recurringfrequency:any, 
         initialBalance:any, 
         dailyLimit:number, 
         tenantId:string, 
         trnAuthLimit:number, 
         startDate:string, 
  }
  
  
 export interface ChildreqaccountdtlResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
