import { IHttpErrorPayload } from '@fpx/core';
  
export interface SchfamilypaymentreqMaintanence {
  schfamilypaymentreq?: Schfamilypaymentreq[],
  totalRowCount?:number
  data?: Schfamilypaymentreq[],
  
}
export interface Schfamilypaymentreq  {
         inventoryNumber:string, 
	     purpose:any, 
         paymentId:string, 
         tenantId:string, 
	     accountCurrency:any, 
	     childAccount:any, 
         scheduleId:string, 
  }
  
  
 export interface SchfamilypaymentreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
