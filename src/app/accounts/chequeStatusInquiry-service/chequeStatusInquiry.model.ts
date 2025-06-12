import { IHttpErrorPayload } from '@fpx/core';
  
export interface ChequeStatusInquiryMaintanence {
  chequeStatusInquiry?: ChequeStatusInquiry[],
  totalRowCount?:number
  data?: ChequeStatusInquiry[],
  
}
export interface ChequeStatusInquiry  {
         chequeAmount:number, 
         payeeName:string, 
         paidDate:string, 
         chequeStatus:string, 
         accountCurrency:string, 
         accountNumber:string, 
         chequeNumber:number, 
  }
  
  
 export interface ChequeStatusInquiryResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
