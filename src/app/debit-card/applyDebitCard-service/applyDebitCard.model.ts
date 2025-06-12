import { IHttpErrorPayload } from '@fpx/core';
  //import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';

export interface ApplyDebitCardMaintanence {
  applyDebitCard?: ApplyDebitCard[],
  totalRowCount?:number
  data?: ApplyDebitCard[],
  
}
export interface ApplyDebitCard  {
	   //  addressInfo:Cobaddressinfo, 
         autoCompleteFlag:string, 
         termsFlag:string, 
         requestReference:string, 
         customerCode:string, 
	     dcCardType:any, 
	     accountNumber:any, 
	     branches:any, 
         inventoryNumber:string, 
         charges:number, 
         authPersonId:string, 
         deliveryOption:string, 
         authPersonName:string, 
         remarks:string, 
  }
  
  
 export interface ApplyDebitCardResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
