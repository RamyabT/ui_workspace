import { IHttpErrorPayload } from '@fpx/core';
  
export interface SchedulebillpaymentslogMaintanence {
  schedulebillpaymentslog?: Schedulebillpaymentslog[],
  totalRowCount?:number
  data?: Schedulebillpaymentslog[],
  
}
export interface Schedulebillpaymentslog  {
	     debitCurrency:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
         customerCode:string, 
         authOn:string, 
	     paymentFrequency:any, 
         paymentAmount:number, 
         createdOn:string, 
         operationMode:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryName:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         scheduleId:string, 
         paymentStatus:string, 
         numberOfPayments:number, 
         nextPaymentDate:string, 
         entityCode:string, 
	     sourceAccount:any, 
         paymentMode:string, 
         chargesAmount:number, 
         debitAmount:number, 
         creditAccountNumber:string, 
	     chargesBorneBy:any, 
         baseCurrencyAmount:number, 
         beneficiaryEmail:string, 
         authBy:string, 
         scheduleType:string, 
         baseRateApplied:string, 
         createdBy:string, 
         tenantId:string, 
         paymentDaysInterval:number, 
	     creditCurrency:any, 
         transactionVersion:string, 
         paymentDate:string, 
	     paymentCurrency:any, 
         creditAmount:number, 
         remarks:string, 
  }
  
  
 export interface SchedulebillpaymentslogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
