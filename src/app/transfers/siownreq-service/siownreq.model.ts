import { IHttpErrorPayload } from '@fpx/core';
  
export interface SiownreqMaintanence {
  siownreq?: Siownreq[],
  totalRowCount?:number
  data?: Siownreq[],
  
}
export interface Siownreq  {
	     debitCurrency:any, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
         customerCode:string, 
         authOn:string, 
         paymentFrequency:string, 
         paymentAmount:number, 
         createdOn:string, 
         operationMode:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         scheduleId:string, 
         paymentStatus:string, 
         numberOfPayments:number, 
	     creditAccount:any, 
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
         paymentDaysInterval:any 
  }
  
  
 export interface SiownreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
