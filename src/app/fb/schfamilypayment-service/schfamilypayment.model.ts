import { IHttpErrorPayload } from '@fpx/core';
  
export interface SchfamilypaymentMaintanence {
  schfamilypayment?: Schfamilypayment[],
  totalRowCount?:number
  data?: Schfamilypayment[],
  
}
export interface Schfamilypayment  {
	     debitCurrency:any, 
	     purpose:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
	     accountCurrency:any, 
         customerCode:string, 
         authOn:string, 
         paymentFrequency:string, 
	     scheduledCategory:any, 
         paymentAmount:number, 
         createdOn:string, 
         operationMode:string, 
         modifiedOn:string, 
         paymentmode:string, 
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
         chargesAmount:number, 
	     childAccount:any, 
         debitAmount:number, 
         creditAccountNumber:string, 
	     chargesBorneBy:any, 
         baseCurrencyAmount:number, 
         beneficiaryEmail:string, 
         authBy:string, 
         paidInstallments:number, 
         scheduleType:string, 
         baseRateApplied:string, 
         createdBy:string, 
         tenantId:string, 
         paymentDaysInterval:number, 
	     creditCurrency:any, 
         transactionVersion:string, 
	     paymentCurrency:any, 
         paymentDate:string, 
         creditAmount:number, 
         remarks:string, 
  }
  
  
 export interface SchfamilypaymentResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
