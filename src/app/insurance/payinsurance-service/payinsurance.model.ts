import { IHttpErrorPayload } from '@fpx/core';
  
export interface PayinsuranceMaintanence {
  payinsurance?: Payinsurance[],
  totalRowCount?:number
  data?: Payinsurance[],
  
}
export interface Payinsurance  {
  chargesAmountCurr: any;
         autoPay:string, 
	     accountNum:any, 
	     debitCurrency:any, 
         endDate:string, 
         policyNumber:string, 
         beneId:string, 
         rateApplied:string, 
         errorCode:string, 
         authOn:string, 
         exchangeAmount:number, 
         paymentFrequency:string, 
         exchangeRate:number, 
         paymentId:string, 
         beneficiaryName:string, 
         fromCurrency:string, 
         beneficiaryAdvice:string, 
         isFavourite:string, 
         scheduleId:string, 
         walletId:string, 
         creditCardRefNumber:string, 
         debitAmount:number, 
         authBy:string, 
         debitCardRefNumber:string, 
         scheduleType:string, 
         toCurrency:string, 
         baseRateApplied:string, 
         paymentMethod:string, 
         transactionVersion:string, 
	     paymentCurrency:any, 
         creditAmount:number, 
         errorDescription:string, 
         serviceCode:string, 
         termsFlag:string, 
         customerCode:string, 
         paymentAmount:any, 
         createdOn:string, 
         modifiedOn:string, 
         modifiedBy:string, 
         paymentStatus:string, 
         numberOfPayments:number, 
         entityCode:string, 
	     sourceAccount:any, 
         paymentMode:string, 
         chargesAmount:any, 
         creditAccountNumber:string, 
	     chargesBorneBy:any, 
         baseCurrencyAmount:number, 
         beneficiaryEmail:string, 
         createdBy:string, 
         tenantId:string, 
         paymentDaysInterval:number, 
	     creditCurrency:any, 
	     allPurpose:any, 
         paymentDate:string, 
         remarks:string, 
         amount:any,
         operationMode:any
       
  }
  
  
 export interface PayinsuranceResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
