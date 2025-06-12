import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoanpreclosurerequestMaintanence {
  loanpreclosurerequest?: Loanpreclosurerequest[],
  totalRowCount?:number
  data?: Loanpreclosurerequest[],
  
}
export interface Loanpreclosurerequest  {
         prePaymentAmount:any, 
	     debitCurrency:any, 
	     debitAccountNumber:any, 
         termsFlag:string, 
         authOn:string, 
         debitAmount:number, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         baseRate:number, 
	     loanAccountNumber:any, 
         exchangeRate:number, 
         createdBy:string, 
	     prePaymentCurrency:any, 
         tenantId:string, 
         modifiedBy:string, 
         paymentDate:string, 
	     supportingDocuments:any, 
         remarks:string, 
         chargesAmount:any,
  }
  
  
 export interface LoanpreclosurerequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
