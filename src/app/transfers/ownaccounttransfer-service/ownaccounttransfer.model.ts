import { IHttpErrorPayload } from '@fpx/core';
  import {  Pymts } from '../pymts-service/pymts.model';

export interface OwnaccounttransferMaintanence {
  ownaccounttransfer?: Ownaccounttransfer[],
  totalRowCount?:number
  data?: Ownaccounttransfer[],
  
}
export interface Ownaccounttransfer  {
	     debitCurrency:any, 
         errorDescription:string, 
         endDate:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         rateApplied:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         paymentFrequency:string, 
         paymentAmount:any, 
         createdOn:string, 
         modifiedOn:string, 
         paymentId:string, 
         beneficiaryName:string, 
         beneficiaryAdvice:string, 
         modifiedBy:string, 
         paymentStatus:string, 
         scheduleId:string, 
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
  }
  
  
 export interface OwnaccounttransferResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
