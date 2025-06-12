import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoanrepaymentMaintanence {
  loanrepayment?: Loanrepayment[],
  totalRowCount?:number
  data?: Loanrepayment[],
  
}
export interface Loanrepayment  {
	     debitCurrency:any, 
	     debitAccountNumber:any, 
         termsFlag:string, 
         authOn:string, 
         debitAmount:number, 
         createdOn:string, 
         repaidDate:string, 
         inventoryNumber?:string, 
         authBy:string, 
         modifiedOn:string, 
         baseRate:number, 
	     loanAccountNumber:any, 
         dueAmount:any, 
         exchangeRate:number, 
         createdBy:string, 
         tenantId:string, 
         modifiedBy:string, 
	     loanCurrency:any, 
         remarks?:string, 
         chargesAmount:any
  }
  
  
 export interface LoanrepaymentResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
