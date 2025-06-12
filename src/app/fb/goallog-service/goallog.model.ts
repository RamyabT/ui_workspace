import { IHttpErrorPayload } from '@fpx/core';
  
export interface GoallogMaintanence {
  goallog?: Goallog[],
  totalRowCount?:number
  data?: Goallog[],
  
}
export interface Goallog  {
         goalname:string, 
         goalInventoryNumber:string,
         initialContribution:any, 
         authOn:string, 
	       childAcc:any, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         operationMode:string, 
         dueDt:Date, 
         targetAmt:any, 
         createdBy:string, 
	       debitAcc:any, 
         tenantId:string, 
         modifiedBy:string, 
	       currency:any, 
         status:string, 
         //nidhi
         mode:string
         //nidhi
  }
  
  
 export interface GoallogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
