import { IHttpErrorPayload } from '@fpx/core';
  
export interface InvestmenttransactionsummaryMaintanence {
  investmenttransactionsummary?: Investmenttransactionsummary[],
  totalRowCount?:number
  data?: Investmenttransactionsummary[],
  
}
export interface Investmenttransactionsummary  {
         transactionCurrency:string, 
         quantity:string, 
         transactionReference:string, 
         transactionDateTime:string, 
         transactionDescription:string, 
         transactionDate:string, 
         accountNumber:string, 
         productCode:string, 
         debitCreditFlag:string, 
         balance:string, 
         price:string, 
         transactionAmount:number, 
	     transactionCategory:any, 
         commission:string, 
  }
  
  
 export interface InvestmenttransactionsummaryResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
