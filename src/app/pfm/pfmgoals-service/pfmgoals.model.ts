import { IHttpErrorPayload } from '@fpx/core';
  
export interface PfmgoalsMaintanence {
  pfmgoals?: Pfmgoals[],
  totalRowCount?:number
  data?: Pfmgoals[],
  
}
export interface Pfmgoals  {
         goalAmount:number, 
	     debitAccount:any, 
         customerCode:string, 
         advanceDebitAmount:number, 
         authOn:string, 
         debitAmount:string, 
         createdOn:string, 
	     frequency:any, 
         mode:string, 
         inventoryNumber:string, 
         accruedAmount:number, 
         authBy:string, 
         modifiedOn:string, 
         goalDuration:string, 
         createdBy:string, 
         goalName:string, 
         tenantId:string, 
         modifiedBy:string, 
         startDate:string, 
         status:string, 
  }
  
  
 export interface PfmgoalsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
