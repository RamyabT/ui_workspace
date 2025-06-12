import { IHttpErrorPayload } from '@fpx/core';
  
export interface FulfillmentQueueMaintanence {
  fulfillmentQueue?: FulfillmentQueue[],
  totalRowCount?:number
  data?: FulfillmentQueue[],
  
}
export interface FulfillmentQueue  {
         reason:string, 
         recipientIban:string, 
         sendDate:string, 
         senderMobile:string, 
         senderIban:string, 
         recipientCurrency:string, 
         recipientAmount:number, 
         totalAmount:number, 
         senderName:string, 
         recipientMobile:string, 
         senderSurname:string, 
         paymentId:string, 
         recipientName:string, 
         expireDate:string, 
         currency:string, 
         recipientEmail:string, 
         recipientSurname:string, 
         status:string, 
  }
  
  
 export interface FulfillmentQueueResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
