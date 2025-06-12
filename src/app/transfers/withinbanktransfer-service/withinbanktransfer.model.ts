import { IHttpErrorPayload } from '@fpx/core';
  
export interface WithinbanktransferMaintanence {
  withinbanktransfer?: Withinbanktransfer[],
  totalRowCount?:number
  data?: Withinbanktransfer[],
  
}
export interface Withinbanktransfer  {
	     debitCurrency:any, 
         errorDescription:string, 
	     purpose:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         paymentFrequency:string, 
         paymentAmount:number, 
         createdOn:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryName:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         paymentStatus:string, 
         scheduleId:string, 
         bankCode:string, 
         numberOfPayments:number, 
         address:string, 
         entityCode:string, 
	     sourceAccount:any, 
         paymentMode:string, 
         debitAmount:number, 
         creditAccountNumber:string, 
	     chargesBorneBy:any, 
         baseCurrencyAmount:number, 
         branchCode:string, 
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
	     beneficiaryId:any, 
  }
  
  
 export interface WithinbanktransferResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
