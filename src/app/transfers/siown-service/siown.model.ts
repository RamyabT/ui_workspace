import { IHttpErrorPayload } from '@fpx/core';
  
export interface SiownMaintanence {
  siown?: Siown[],
  totalRowCount?:number
  data?: Siown[],
  
}
export interface Siown  {
	     debitCurrency:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
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
         purpose:any,
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
         paidInstallments:any
  }
  
  
 export interface SiownResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
