import { IHttpErrorPayload } from '@fpx/core';
  
export interface DomestictransferMaintanence {
  domestictransfer?: Domestictransfer[],
  totalRowCount?:number
  data?: Domestictransfer[],
  
}
export interface Domestictransfer  {
	     debitCurrency:any, 
         errorDescription:string, 
	     purpose:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
         branchAddress:string, 
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
         transferType:string, 
	     creditCurrency:any, 
         transactionVersion:string, 
	     paymentCurrency:any, 
         paymentDate:string, 
         creditAmount:number, 
         routingCode:string, 
         remarks:string, 
	     beneficiaryId:any, 
       chargesAmount:any
  }
  
  
 export interface DomestictransferResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
