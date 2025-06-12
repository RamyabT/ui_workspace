import { IHttpErrorPayload } from '@fpx/core';
  
export interface CreditcardMaintanence {
  Creditcard?: Creditcard[],
  totalRowCount?:number
  data?: Creditcard[],
  
}
export interface Creditcard  {
         validThru:string, 
         cardHolderName:string, 
	     cardType:any, 
         customerCode:string, 
         branchDesc:string, 
         type:string, 
         productDesc:string, 
         branchCode:string, 
         linkedBankAccount:string, 
         cardRefNumber:string, 
         productCode:string, 
         eCommStatus:string, 
         accountNumber: string,
         blockReason:string, 
         cardNumber:string, 
         primaryCardAccNo:string, 
         status:string, 
  }
  
  
 export interface DebitcardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
