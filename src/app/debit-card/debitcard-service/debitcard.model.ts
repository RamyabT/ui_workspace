import { IHttpErrorPayload } from '@fpx/core';
  
export interface DebitcardMaintanence {
  debitcard?: Debitcard[],
  totalRowCount?:number
  data?: Debitcard[],
  
}
export interface Debitcard  {
  id?:string;
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
         cardReference: string
         cvv: string,
         pinStatus: string
         currentPin: string;
         availableBalance: string;
         actualCardNumber: string;
  }
  
  
 export interface DebitcardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
