import { IHttpErrorPayload } from '@fpx/core';
  
export interface FlashprepaidcardrequestMaintanence {
  flashprepaidcardrequest?: Flashprepaidcardrequest[],
  totalRowCount?:number
  data?: Flashprepaidcardrequest[],
  
}
export interface Flashprepaidcardrequest  {
         validThru:string, 
         cvv:string, 
         cardHolderName:string, 
         authOn:string, 
	     cardReference:any, 
         validFrom:string, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
         modifiedBy:string, 
         cardNumber:string, 
         status:string, 
  }
  
  
 export interface FlashprepaidcardrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
