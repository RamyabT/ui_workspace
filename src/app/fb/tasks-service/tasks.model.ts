import { IHttpErrorPayload } from '@fpx/core';
  
export interface TasksMaintanence {
  tasks?: Tasks[],
  totalRowCount?:number
  data?: Tasks[],
  
}
export interface Tasks  {
         dueDate:string, 
	     rewardCurrency:any, 
         customerCode:string, 
         authOn:string, 
         mappedGoal:string, 
         createdOn:string, 
	     debitAccNo:any, 
         inventoryNumber:string, 
	     childAccNo:any, 
         operationMode:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
	     supportingDocument:any, 
         tenantId:string, 
         taskName:string, 
         modifiedBy:string, 
         rewardAmount:number, 
         proofRequired:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface TasksResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
