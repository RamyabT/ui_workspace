import { IHttpErrorPayload } from '@fpx/core';
  
export interface WorkflowqMaintanence {
  workflowq?: workflowq[],
  totalRowCount?:number
  data?: workflowq[],
  
}
export interface workflowq  {
         owner:string, 
         initOn:string, 
         potOwner:string, 
         serviceCode:string, 
         pendingSince:string, 
         requestReference:string, 
         customerCode:string, 
         taskInstanceId:string, 
         initBy:string, 
         serviceName:string, 
         flowInstanceId:string, 
         workflowAmt:string, 
         operationMode:string, 
         stage:string, 
         pendingCount:string, 
         workflowAccNum:string, 
         tenantId:string, 
         action:string, 
         taskName:string, 
         workflowType:string, 
         workflowAccName:string, 
         actionOn:string, 
         domainKey:string, 
         accountNumber:string,
         accountName:string
  }
  
  
 export interface WorkflowqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
