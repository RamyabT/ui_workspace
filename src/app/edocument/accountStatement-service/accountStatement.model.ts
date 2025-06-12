import { IHttpErrorPayload } from '@fpx/core';
  
export interface AccountStatementMaintanence {
  accountStatement?: AccountStatement[],
  totalRowCount?:number
  data?: AccountStatement[],
  
}
export interface AccountStatement  {
	     year:any, 
	     estmtrelationship:any, 
  }
  
  
 export interface AccountStatementResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
