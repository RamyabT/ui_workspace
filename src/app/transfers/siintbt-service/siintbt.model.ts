import { IHttpErrorPayload } from '@fpx/core';
  
export interface SiintbtMaintanence {
  siintbt?: Siintbt[],
  totalRowCount?:number
  data?: Siintbt[],
  
}
export interface Siintbt  {
	     debitCurrency:any, 
	     purpose:any, 
         accountName:string, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         rateApplied:string, 
	     accountCurrency:any, 
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
         accountNumber:string, 
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
         paymentDaysInterval:any ,
         paidInstallments:any,
         beneficiaryName : any,
         creditAccountNumber : any
  }
  
  
 export interface SiintbtResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
