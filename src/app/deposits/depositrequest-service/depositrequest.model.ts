import { IHttpErrorPayload } from '@fpx/core';
  
export interface DepositrequestMaintanence {
  depositrequest?: Depositrequest[],
  totalRowCount?:number
  data?: Depositrequest[],
  
}
export interface Depositrequest  {
	     debitAccount:any, 
         termsFlag:string, 
         customerCode:string, 
         authOn:string, 
         createdOn:string, 
         maturityAmount:number, 
         inventoryNumber:string, 
         depositDate:string, 
         modifiedOn:string, 
	     maturityInstructions:any, 
         exchangeRate:number, 
         maturityDate:string, 
	 charity:any, 
         tenorInDays:string, 
         equivalentAmount:number, 
         modifiedBy:string, 
	     depositCurrency:any, 
         baseEquivalentAmount:number, 
         depositAmount:number, 
	 charityPercentage:string, 
         interestRate:number, 
	     creditAccount:any, 
         entityCode:string, 
         chargesAmount:number, 
         debitAmount:number, 
         authBy:string, 
	     productCode:any, 
         baseRate:number, 
         createdBy:string, 
         tenantId:string, 
	     interestpaymentfrequency:any, 
         tenorInYears:string, 
	     tenorInMonths:any, 
         remarks:string, 
  }
  
  
 export interface DepositrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
