import { IHttpErrorPayload } from '@fpx/core';
import { Raisedsputedocupload } from '../raisedsputedocupload-service/raisedsputedocupload.model';
  
export interface CcraisedisputeMaintanence {
  ccraisedispute?: Ccraisedispute[],
  totalRowCount?:number
  data?: Ccraisedispute[],
  
}
export interface Ccraisedispute  {
	     reason:any, 
         entityCode:string, 
         autoCompleteFlag:string, 
         cardHolderName:string, 
         cardType:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         updtOn:string, 
         authOn:string, 
         transactionDate:string, 
         createdOn:string, 
         inventoryNumber?:string, 
	     cardRefNumber:any, 
         authBy:string, 
         modifiedOn:string, 
         terms:string, 
         createdBy:string, 
         transactionAmount:number, 
         currency:string, 
         modifiedBy:string, 
         cardNumber?:string, 
         remarks?:string, 
         status:string, 
         cardReference:string,
         supportingDocument?:Raisedsputedocupload[],
         transactionCurrency: any,
         transactionType: any,
         transactionReference: any,
         transCat: any,
         transactionDescription: any,
         merchantId: any
  }
  
  
 export interface CcraisedisputeResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
