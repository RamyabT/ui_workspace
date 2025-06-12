import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoandisbursalscheduleMaintanence {
  loandisbursalschedule?: Loandisbursalschedule[],
  totalRowCount?:number
  data?: Loandisbursalschedule[],
  
}
export interface Loandisbursalschedule  {
         disbursalAmount:number, 
         disbursalId:string, 
         disbursalTo:string, 
         loanAccountNumber:string, 
	     paymentMode:any, 
         disbursalStatus:string, 
         disbursalType:string, 
         accountNumber:string, 
         disbursalDate:string, 
  }
  
  
 export interface LoandisbursalscheduleResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
