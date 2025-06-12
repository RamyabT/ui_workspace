import { IHttpErrorPayload } from '@fpx/core';
  
export interface AedtransferMaintanence {
  aedtransfer?: Aedtransfer[],
  totalRowCount?:number
  data?: Aedtransfer[],
  
}
export interface Aedtransfer  {
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
         beneEmail:string, 
         paymentAmount:number, 
         createdOn:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryName:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         paymentDetails:string, 
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
	     beneficiaryId:any, 
  }
  
  
 export interface AedtransferResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
