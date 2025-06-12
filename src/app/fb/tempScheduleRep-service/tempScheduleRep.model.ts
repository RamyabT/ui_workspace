import { IHttpErrorPayload } from '@fpx/core';
  
export interface TempScheduleRepMaintanence {
  tempScheduleRep?: TempScheduleRep[],
  totalRowCount?:number
  data?: TempScheduleRep[],
  
}
export interface TempScheduleRep  {
         numberOfPayments:number, 
         nextPaymentDate:string, 
	     sourceAccount:any, 
         serviceCode:string, 
         beneId:string, 
         customerCode:string, 
         authOn:string, 
	     paymentFrequency:any, 
         creditAccountNumber:string, 
	     scheduledCategory:any, 
         paymentAmount:number, 
         createdOn:string, 
         modifiedOn:string, 
         authBy:string, 
         scheduleType:string, 
         createdBy:string, 
         paymentId:string, 
         beneficiaryName:string, 
         tenantId:string, 
         modifiedBy:string, 
	     paymentCurrency:any, 
         paymentDate:string, 
         paymentStatus:string, 
  }
  
  
 export interface TempScheduleRepResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
