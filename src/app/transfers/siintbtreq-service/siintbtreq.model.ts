import { IHttpErrorPayload } from '@fpx/core';
  
export interface SiintbtreqMaintanence {
  siintbtreq?: Siintbtreq[],
  totalRowCount?:number
  data?: Siintbtreq[],
  
}
export interface Siintbtreq  {
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
         paymentAmount:number, 
         createdOn:string, 
         operationMode:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         scheduleId:string, 
         paymentStatus:string, 
         numberOfPayments:number, 
         nextPaymentDate:string, 
         entityCode:string, 
	     sourceAccount:any, 
         paymentMode:string, 
         debitAmount:number, 
         creditAccountNumber:string, 
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
	     beneficiaryId:any, 
       paymentDaysInterval:any
  }
  
  
 export interface SiintbtreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
