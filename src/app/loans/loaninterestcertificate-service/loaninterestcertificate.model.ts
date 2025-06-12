import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoaninterestcertificateMaintanence {
  loaninterestcertificate?: Loaninterestcertificate[],
  totalRowCount?:number
  data?: Loaninterestcertificate[],
  
}
export interface Loaninterestcertificate  {
	     loanAccountNumber:any, 
         dateTo:string, 
         dateFrom:string
  }
  
  
 export interface LoaninterestcertificateResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
