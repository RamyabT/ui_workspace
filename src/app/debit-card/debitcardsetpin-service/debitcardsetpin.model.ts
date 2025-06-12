import { IHttpErrorPayload } from '@fpx/core';
  
export interface DebitcardsetpinMaintanence {
  debitcardsetpin?: Debitcardsetpin[],
  totalRowCount?:number
  data?: Debitcardsetpin[],
  
}
export interface Debitcardsetpin  {
         termsFlag:string, 
         errorMessage:string, 
         errorCode:string, 
         reenteredPin:number, 
         updtOn:string, 
         authOn:string, 
	     cardReference:any, 
         createdOn:string, 
         newPin:number, 
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
         modifiedBy:string, 
         remarks:string, 
  }
  
  
 export interface DebitcardsetpinResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
