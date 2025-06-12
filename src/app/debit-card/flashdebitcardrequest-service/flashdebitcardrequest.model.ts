import { IHttpErrorPayload } from '@fpx/core';
  
export interface FlashdebitcardrequestMaintanence {
  flashdebitcardrequest?: Flashdebitcardrequest[],
  totalRowCount?:number
  data?: Flashdebitcardrequest[],
  
}
export interface Flashdebitcardrequest  {
         validThru:string, 
         cvv:string, 
         cardHolderName:string, 
         authOn:string, 
	     cardReference:any, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
         modifiedBy:string, 
         cardNumber:string, 
         status:string, 
  }
  
  
 export interface FlashdebitcardrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
