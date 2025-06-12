import { IHttpErrorPayload } from '@fpx/core';
import { Taskreqcompdocdtl } from '../taskreqcompdocdtl-service/taskreqcompdocdtl.model';
  
export interface Fbchoresdetails {
    tasks?: tasks[],
  totalRowCount?:number
  data?: tasks[],
  
}
export interface tasks  {
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
  
  
 export interface TasklogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
