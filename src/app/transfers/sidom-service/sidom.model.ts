import { IHttpErrorPayload } from '@fpx/core';
  
export interface SidomMaintanence {
  sidom?: Sidom[],
  totalRowCount?:number
  data?: Sidom[],
  
}
export interface Sidom  {

  paymentId:string,
	     debitCurrency:any, 
         purpose:string, 
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
         modifiedOn:string, 
         paymentmode:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         scheduleId:string, 
         paymentStatus:string, 
	     bankCode:any, 
         numberOfPayments:number, 
         creditAccount:string, 
         creditAccountNumber:any,
         transferType:any,
         entityCode:string, 
	     sourceAccount:any, 
         debitAmount:number, 
         accountNumber:string, 
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
         paymentDaysInterval:any,
         paidInstallments:any,
         chargesAmount:any
  }
  
  
 export interface SidomResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
