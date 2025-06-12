import { IHttpErrorPayload } from '@fpx/core';
  
export interface DepositCalculatorMaintanence {
  depositCalculator?: DepositCalculator[],
  totalRowCount?:number
  data?: DepositCalculator[],
  
}
export interface DepositCalculator  {
	     depositProducts:any, 
         amount:any, 
	     interestpaymentfrequency:any, 
         tenure:string, 
         tenorInDays:any,
         tenorInMonths:any,
         tenorInYears:any,
         depositdate:any
  }
  
  
 export interface DepositCalculatorResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
