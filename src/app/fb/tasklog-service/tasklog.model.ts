import { IHttpErrorPayload } from '@fpx/core';
import { Taskreqcompdocdtl } from '../taskreqcompdocdtl-service/taskreqcompdocdtl.model';
  
export interface TasklogMaintanence {
  tasklog?: Tasklog[],
  totalRowCount?:number
  data?: Tasklog[],
  
}
export interface Tasklog  {
         dueDate:string, 
	     rewardCurrency:any, 
         updtOn:string, 
         authOn:string, 
         mappedGoal:string, 
         createdOn:string, 
	     debitAccNo:any, 
         inventoryNumber:string, 
	     childAccNo:any, 
         operationMode:string, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
	     supportingDocument:Taskreqcompdocdtl, 
         tenantId:string, 
         taskName:string, 
         modifiedBy:string, 
         rewardAmount:any, 
         proofRequired:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface TasklogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
