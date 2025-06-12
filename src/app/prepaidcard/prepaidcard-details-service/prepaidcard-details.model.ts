import { IHttpErrorPayload } from '@fpx/core';
  
export interface PrepaidcardMaintanence {
  Prepaidcard?: Prepaidcard[],
  totalRowCount?:number
  data?: Prepaidcard[],
  
}
export interface Prepaidcard  {
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
  
  
 export interface PrepaidcardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
