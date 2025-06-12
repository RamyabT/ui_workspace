import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoanrepaymentscheduleMaintanence {
  loanrepaymentschedule?: Loanrepaymentschedule[],
  totalRowCount?:number
  data?: Loanrepaymentschedule[],
  
}
export interface Loanrepaymentschedule  {
         interestRate:number, 
         loanAccountNumber:string, 
         installmentAmount:number, 
         principalOutstandingAmount:number, 
         repaymentDate:string, 
         interestAmount:number, 
         loanAmount:number, 
         serialNo:number, 
  }
  
  
 export interface LoanrepaymentscheduleResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
