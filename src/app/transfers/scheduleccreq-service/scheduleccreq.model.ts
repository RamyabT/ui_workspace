import { IHttpErrorPayload } from '@fpx/core';
  
export interface ScheduleccreqMaintanence {
  scheduleccreq?: Scheduleccreq[],
  totalRowCount?:number
  data?: Scheduleccreq[],
  
}
export interface Scheduleccreq  {
	     debitCurrency:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
         branchAddress:string, 
         customerCode:string, 
         authOn:string, 
         paymentFrequency:string, 
         paymentAmount:number, 
         createdOn:string, 
         operationMode:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryName:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         scheduleId:string, 
         paymentStatus:string, 
	     bankCode:any, 
         numberOfPayments:number, 
         nextPaymentDate:string, 
         creditAccount:string, 
         entityCode:string, 
	     sourceAccount:any, 
         paymentMode:string, 
         debitAmount:number, 
         creditAccountNumber:string, 
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
	     beneficiaryId:any, 
       paymentDaysInterval:any,
       paidInstallments:any
  }
  
  
 export interface ScheduleccreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
