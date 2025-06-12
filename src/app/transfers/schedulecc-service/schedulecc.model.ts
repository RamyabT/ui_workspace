import { IHttpErrorPayload } from '@fpx/core';
  
export interface ScheduleccMaintanence {
  schedulecc?: Schedulecc[],
  totalRowCount?:number
  data?: Schedulecc[],
  
}
export interface Schedulecc  {
	     debitCurrency:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         rateApplied:string, 
         branchAddress:string, 
         customerCode:string, 
         authOn:string, 
         paymentFrequency:string, 
         paymentAmount:number, 
         createdOn:string, 
         modifiedOn:string, 
         paymentmode:string, 
         paymentId:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         paymentStatus:string, 
	     bankCode:any, 
         numberOfPayments:number, 
         creditAccount:string, 
         entityCode:string, 
	     sourceAccount:any, 
         debitAmount:number, 
	     chargesBorneBy:any, 
         baseCurrencyAmount:number, 
	     branchCode:any, 
         beneficiaryEmail:string, 
         authBy:string, 
         scheduleType:string, 
         baseRateApplied:string, 
         createdBy:string, 
	     creditCurrency:any, 
         transactionVersion:string, 
	     paymentCurrency:any, 
         paymentDate:string, 
         creditAmount:number, 
         routingCode:string, 
         remarks:string, 
         beneficiaryId:string, 
         purpose:any,
         paymentDaysInterval:any,
         paymentDetails:any,
         paidInstallments:any
  }
  
  
 export interface ScheduleccResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
