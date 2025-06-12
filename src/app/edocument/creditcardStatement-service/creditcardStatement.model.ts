import { IHttpErrorPayload } from '@fpx/core';
  
export interface CreditcardStatementMaintanence {
  creditcardStatement?: CreditcardStatement[],
  totalRowCount?:number
  data?: CreditcardStatement[],
  
}
export interface CreditcardStatement  {
	     cardRefNumber:any, 
	     year:any, 
  }
  
  
 export interface CreditcardStatementResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
