import { IHttpErrorPayload } from '@fpx/core';
  
export interface PrePaidActivationMaintanence {
  prePaidActivation?: PrePaidActivation[],
  totalRowCount?:number
  data?: PrePaidActivation[],
  
}
export interface PrePaidActivation  {
         activatePin:string, 
         cardName:string, 
         accountName:string, 
         termsFlag:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
	     expiryYear:any, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         modifiedBy:string, 
         cvv:string, 
         entityCode:string, 
         autoCompleteFlag:string, 
         expiryMonth:string, 
         errorMessage:string, 
         accountNumber:string, 
         cardNumberUnMasked:string, 
	     cardRefNumber:any, 
         authBy:string, 
         createdBy:string, 
         activationDate:string, 
         cardNumber:string, 
         remarks:string, 
  }
  
  
 export interface PrePaidActivationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
