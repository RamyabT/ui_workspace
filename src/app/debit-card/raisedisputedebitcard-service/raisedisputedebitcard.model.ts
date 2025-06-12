import { IHttpErrorPayload } from '@fpx/core';
import { Raisedisputedocupload } from '../raisedisputedocupload-service/raisedisputedocupload.model';
  
export interface RaisedisputedebitcardMaintanence {
  raisedisputedebitcard?: Raisedisputedebitcard[],
  totalRowCount?:number
  data?: Raisedisputedebitcard[],
  
}
export interface Raisedisputedebitcard  {
	     reason:any, 
         requestReference:string, 
         errorCode:string, 
         customerCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber?:string, 
         modifiedOn:string, 
         terms:string, 
         transactionAmount:any, 
         currency:any, 
         modifiedBy:string, 
         entityCode:string, 
         autoCompleteFlag:string, 
         cardHolderName:string, 
         cardType:string, 
         errorMessage:string, 
         updtOn:string, 
         transactionDate:string, 
	     cardRefNumber:any, 
         authBy:string, 
         createdBy:string, 
         cardNumber?:string, 
         remarks?:string, 
         status:string, 
         amount:any,
         currencyCode:any,
         supportingDocuments?:Raisedisputedocupload[],
         cardReference:string, 
         transactionCurrency: string,
         transType: string,
         transactionReference: string,
         transCat : any,
         transactionDescription: any,
         merchantId: any
  }
  
  
 export interface RaisedisputedebitcardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
