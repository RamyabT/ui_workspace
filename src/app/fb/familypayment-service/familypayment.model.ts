import { IHttpErrorPayload } from '@fpx/core';
  
export interface FamilypaymentMaintanence {
  familypayment?: Familypayment[],
  totalRowCount?:number
  data?: Familypayment[],
  
}
export interface Familypayment  {
	     debitCurrency:any, 
         errorDescription:string, 
	     purpose:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
	     accountCurrency:any, 
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
         isFavourite:string, 
         paymentStatus:string, 
         scheduleId:string, 
         numberOfPayments:number, 
         entityCode:string, 
	     sourceAccount:any, 
         paymentMode:string, 
         chargesAmount:number, 
	     childAccount:any, 
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
         paymentDaysInterval:number, 
	     creditCurrency:any, 
         transactionVersion:string, 
	     allPurpose:any, 
	     paymentCurrency:any, 
         paymentDate:string, 
         creditAmount:number, 
         remarks:string, 
         scheduledCategory:string
  }
  
  
 export interface FamilypaymentResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
