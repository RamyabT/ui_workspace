import { IHttpErrorPayload } from '@fpx/core';
  
export interface TempScheduleRepMaintanence {
  tempScheduleRep?: BeneSelect[],
  totalRowCount?:number
  data?: BeneSelect[],
  
}
export interface BeneSelect  {
         numberOfPayments:number, 
         nextPaymentDate:string, 
	     sourceAccount:any, 
         serviceCode:string, 
         beneId:string, 
         creditAccountNumber:string, 
         paymentAmount:number, 
         scheduleType:string, 
         paymentId:string, 
         beneficiaryName:string, 
	     paymentCurrency:any, 
         paymentDate:string, 
	     paymentFrequency:any, 
         paymentStatus:string, 
  }
  
  
 export interface BeneSelectResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
