import { IHttpErrorPayload } from '@fpx/core';
  
export interface SchautopayreqMaintanence {
  schautopayreq?: Schautopayreq[],
  totalRowCount?:number
  data?: Schautopayreq[],
  
}
export interface Schautopayreq  {
	     debitCurrency:any, 
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
         inventoryNumber:string, 
         operationMode:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryName:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         scheduleId:string, 
         paymentStatus:string, 
         numberOfPayments:number, 
         nextPaymentDate:string, 
         entityCode:string, 
	     sourceAccount:any, 
         paymentMode:string, 
         chargesAmount:number, 
         debitAmount:number, 
         creditAccountNumber:string, 
	     chargesBorneBy:any, 
         baseCurrencyAmount:number, 
         beneficiaryEmail:string, 
         authBy:string, 
         scheduleType:string, 
         baseRateApplied:string, 
         createdBy:string, 
         tenantId:string, 
	     fromAccNo:any, 
         paymentDaysInterval:number, 
	     creditCurrency:any, 
         transactionVersion:string, 
	     paymentCurrency:any, 
         paymentDate:string, 
         creditAmount:number, 
         remarks:string, 
  }
  
  
 export interface SchautopayreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
