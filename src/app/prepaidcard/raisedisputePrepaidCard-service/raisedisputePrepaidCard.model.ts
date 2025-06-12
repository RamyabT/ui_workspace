import { IHttpErrorPayload } from '@fpx/core';
import { Ppraisedisputedoc } from '../ppraisedisputedoc-service/ppraisedisputedoc.model';
  
export interface RaisedisputePrepaidCardMaintanence {
  raisedisputePrepaidCard?: RaisedisputePrepaidCard[],
  totalRowCount?:number
  data?: RaisedisputePrepaidCard[],
  
}
export interface RaisedisputePrepaidCard  {
	     reason:any, 
         entityCode:string, 
         autoCompleteFlag:string, 
         cardHolderName:string, 
         UpdateOn:string, 
         cardType:string, 
         errorMessage:string, 
         requestReference:string, 
         errorCode:string, 
         customerCode:string, 
         authOn:string, 
	     cardReference:any, 
         transactionDate:string, 
         createdOn:string, 
         inventoryNumber?:string, 
         modifiedOn:string, 
         authBy:string, 
         terms:string, 
         createdBy:string, 
         transactionAmount:number, 
         modifiedBy:string, 
	     currency:any, 
         remarks?:string, 
         cardNumber?:string,
         supportingDocuments?:Ppraisedisputedoc[] ,
         transactionReference: any,
         transactionCurrency: any,
         transType: any,
         merchantId: any,
         transCat: any,
         transactionDescription: any
  }
  
  
 export interface RaisedisputePrepaidCardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
