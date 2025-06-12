import { IHttpErrorPayload } from '@fpx/core';
  
export interface IntlScheduleMaintanence {
  intlSchedule?: IntlSchedule[],
  totalRowCount?:number
  data?: IntlSchedule[],
  
}
export interface IntlSchedule  {
  creditAccountNumber: any;
  
	     debitCurrency:any, 
	     purpose:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
	     beneId:any, 
         rateApplied:string, 
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
         numberOfPayments:number, 
         creditAccount:string, 
         entityCode:string, 
	     sourceAccount:any, 
         debitAmount:number, 
	     chargesBorneBy:any, 
         baseCurrencyAmount:number, 
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
         remarks:string, 
         beneficiaryId:string, 
         paymentDaysInterval:any,
         paidInstallments: any,
         chargesAmount:any; 
         nextPaymentDate:string    
  }
  
  
 export interface IntlScheduleResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
