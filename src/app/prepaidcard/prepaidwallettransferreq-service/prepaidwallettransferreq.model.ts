import { IHttpErrorPayload } from '@fpx/core';
  
export interface PrepaidwallettransferreqMaintanence {
  prepaidwallettransferreq?: Prepaidwallettransferreq[],
  totalRowCount?:number
  data?: Prepaidwallettransferreq[],
  
}
export interface Prepaidwallettransferreq  {
         cbxrTerms:string, 
         customerCode:string, 
         errorCode:string, 
         authOn:string, 
         paymentAmount:number, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
	     fromCurrency:any, 
         modifiedBy:string, 
         baseEquiAmount:number, 
         entityCode:string, 
         autoCompleteFlag:string, 
         errorMessage:string, 
         exchageRate:number, 
         debitAmount:number, 
	     cardRefNumber:any, 
         charges:number, 
         authBy:string, 
         baseRate:number, 
	     toCurrency:any, 
         createdBy:string, 
	     paymentCurrency:any, 
         creditAmount:number, 
         remarks:string, 
  }
  
  
 export interface PrepaidwallettransferreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
