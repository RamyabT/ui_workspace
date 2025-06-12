import { IHttpErrorPayload } from '@fpx/core';
  
export interface ViewscheduledbillsMaintanence {
  viewscheduledbills?: Viewscheduledbills[],
  totalRowCount?:number
  data?: Viewscheduledbills[],
  
}
export interface Viewscheduledbills  {
         numberOfPayments:number, 
         nextPaymentDate:string, 
	     sourceAccount:any, 
         endDate:string, 
         beneId:string, 
         chargesAmount:number, 
         customerCode:string, 
         creditAccountNumber:string, 
	     paymentFrequency:any, 
         paymentAmount:number, 
         operationMode:string, 
         paidInstallments:number, 
         scheduleType:string, 
         paymentId:string, 
         beneficiaryName:string, 
         tenantId:string, 
	     scheduleCategory:any, 
         paymentDaysInterval:number, 
	     paymentCurrency:any, 
         paymentDate:string, 
  }
  
  
 export interface ViewscheduledbillsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
