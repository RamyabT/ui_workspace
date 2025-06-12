import { IHttpErrorPayload } from '@fpx/core';
  
export interface ExpensesDetailsMaintanence {
  expensesDetails?: ExpensesDetails[],
  totalRowCount?:number
  data?: ExpensesDetails[],
  
}
export interface ExpensesDetails  {
         otherLoanEMI:number, 
         monthlyExpenses:number, 
         tenantId:string, 
         applicantId:string, 
         annualPropertyTax:number, 
         monthlyCondominiumFees:number, 
  }
  
  
 export interface ExpensesDetailsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
