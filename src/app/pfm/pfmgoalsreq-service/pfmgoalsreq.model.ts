import { IHttpErrorPayload } from '@fpx/core';
  
export interface PfmgoalsreqMaintanence {
  pfmgoalsreq?: Pfmgoalsreq[],
  totalRowCount?:number
  data?: Pfmgoalsreq[],
  
}
export interface Pfmgoalsreq  {
         goalAmount:number, 
	     debitAccount:any, 
         advanceDebitAmount:number, 
         authOn:string, 
         debitAmount:number, 
         createdOn:string, 
         goalInventoryNumber:string, 
	     frequency:any, 
         inventoryNumber:string, 
         operationMode:string, 
         accruedAmount:number, 
         authBy:string, 
         modifiedOn:string, 
         goalDuration:string, 
         createdBy:string, 
         goalName:string, 
         tenantId:string, 
         modifiedBy:string, 
         startDate:string, 
	     status:any, 
       mode:any,
  }
  
  
 export interface PfmgoalsreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
