import { IHttpErrorPayload } from '@fpx/core';
  
export interface ScheduleetransferMaintanence {
  scheduleetransfer?: Scheduleetransfer[],
  totalRowCount?:number
  data?: Scheduleetransfer[],
  
}
export interface Scheduleetransfer  {
         contactCategory:string, 
	     debitCurrency:any, 
         endDate:string, 
         beneId:string, 
         rateApplied:string, 
         notificationPreference:string, 
         authOn:string, 
         paymentFrequency:string, 
         paymentId:string, 
         beneficiaryName:string, 
         transferMode:string, 
         beneficiaryAdvice:string, 
         scheduleId:string, 
         depositConsent:string, 
         nextPaymentDate:string, 
	     contactId:any, 
         contactName:string, 
         debitAmount:number, 
         authBy:string, 
         scheduleType:string, 
         baseRateApplied:string, 
         contactPhoneNumber:string, 
         transactionVersion:string, 
	     paymentCurrency:any, 
         creditAmount:number, 
	     preferredLanguage:any, 
         securityAnswer:string, 
         serviceCode:string, 
         termsFlag:string, 
         fulfillConsent:string, 
         customerCode:string, 
         paymentAmount:number, 
         createdOn:string, 
         operationMode:string, 
         modifiedOn:string, 
         autoDepositEnabled:string, 
         modifiedBy:string, 
         paymentStatus:string, 
         numberOfPayments:number, 
         contactEmailId:string, 
         entityCode:string, 
	     sourceAccount:any, 
         securityQuestion:string, 
         paymentMode:string, 
         chargesAmount:number, 
         creditAccountNumber:string, 
	     chargesBorneBy:any, 
         baseCurrencyAmount:number, 
         beneficiaryEmail:string, 
         createdBy:string, 
         tenantId:string, 
         paymentDaysInterval:number, 
	     creditCurrency:any, 
         paymentDate:string, 
         remarks:string, 
  }
  
  
 export interface ScheduleetransferResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
