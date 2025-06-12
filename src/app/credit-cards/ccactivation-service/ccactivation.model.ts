import { IHttpErrorPayload } from '@fpx/core';
  
export interface CcactivationMaintanence {
  ccactivation?: Ccactivation[],
  totalRowCount?:number
  data?: Ccactivation[],
  
}
export interface Ccactivation  {
         validThru:string, 
         cardName:string, 
         requestReference:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         creditCardUnmasked:string, 
         modifiedOn:string, 
	     expiryyear:any, 
         modifiedBy:string, 
         termsandconditions:string, 
         activePin:number, 
         autoComplete:string, 
         cvv:string, 
         entityCode:string, 
         errorMessage:string, 
	     expiryMonth:any, 
	     cardRefNumber:any, 
         authBy:string, 
         createdBy:string, 
         activationDate:string, 
         remarks:string, 
         cardNumber:string, 
         status:string, 
  }
  
  
 export interface CcactivationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
