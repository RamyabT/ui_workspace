import { IHttpErrorPayload } from '@fpx/core';
  
export interface DcactivatecardMaintanence {
  dcactivatecard?: Dcactivatecard[],
  totalRowCount?:number
  data?: Dcactivatecard[],
  
}
export interface Dcactivatecard  {
         activatePin:string, 
         cardName:string, 
         accountName:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         tcflag:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
	     expiryyear:any, 
         modifiedBy:string, 
         cvv:string, 
         entityCode:string, 
         autoCompleteFlag:string, 
	     expiryMonth:any, 
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
  
  
 export interface DcactivatecardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
