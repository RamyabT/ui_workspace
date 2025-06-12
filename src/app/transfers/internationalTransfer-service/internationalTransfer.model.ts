import { IHttpErrorPayload } from '@fpx/core';
  
export interface InternationalTransferMaintanence {
  internationalTransfer?: InternationalTransfer[],
  totalRowCount?:number
  data?: InternationalTransfer[],
  
}
export interface InternationalTransfer  {
  chargesAmount: any;
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
	     paymentFrequency:any, 
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
       nextPaymentDate:any
  }
  
  
 export interface InternationalTransferResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
