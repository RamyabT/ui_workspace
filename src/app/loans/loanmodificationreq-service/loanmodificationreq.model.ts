import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoanmodificationreqMaintanence {
  loanmodificationreq?: Loanmodificationreq[],
  totalRowCount?:number
  data?: Loanmodificationreq[],
  
}
export interface Loanmodificationreq  {
         additionalLoanAmt:number, 
         termsFlag:string, 
	     loanModificationType:any, 
         authOn:string, 
         propInstDate:string, 
         fileUpload:string, 
         createdOn:string, 
         inventoryNumber?:string, 
         authBy:string, 
         modifiedOn:string, 
         additionalLoanTenor:number, 
	     loanAccountNumber:any, 
         createdBy:string, 
         currentInstDate:string, 
	     currency:any, 
         modifiedBy:string, 
	     additionalLoanTenorUnit:any, 
         remarks:string, 
         deferralAmt:number, 
         purposeOfDeferment:any;
         otherReason:any;
  }
  
  
 export interface LoanmodificationreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
