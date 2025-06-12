import { IHttpErrorPayload } from '@fpx/core';
  
export interface PymtsMaintanence {
  pymts?: Pymts[],
  totalRowCount?:number
  data?: Pymts[],
  
}
export interface Pymts  {
	     debitCurrency:any, 
         errorDescription:string, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
	     paymentFrequency:any, 
         paymentAmount:number, 
         createdOn:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryName:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         paymentStatus:string, 
         scheduleId:string, 
         numberOfPayments:number, 
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
  }
  
  
 export interface PymtsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
