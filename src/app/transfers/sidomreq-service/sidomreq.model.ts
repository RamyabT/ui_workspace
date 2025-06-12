import { IHttpErrorPayload } from '@fpx/core';
  
export interface SidomreqMaintanence {
  sidomreq?: Sidomreq[],
  totalRowCount?:number
  data?: Sidomreq[],
  
}
export interface Sidomreq  {
	     debitCurrency:any, 
	     purpose:any, 
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
         paymentId:string, 
         modifiedOn:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         scheduleId:string, 
         paymentStatus:string, 
	     bankCode:any, 
         numberOfPayments:number, 
         creditAccount:string, 
         entityCode:string, 
	     sourceAccount:any, 
         paymentMode:string, 
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
         paymentDaysInterval:any 
  }
  
  
 export interface SidomreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
