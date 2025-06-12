import { IHttpErrorPayload } from '@fpx/core';
  
export interface CcflashrequestMaintanence {
  ccflashrequest?: Ccflashrequest[],
  totalRowCount?:number
  data?: Ccflashrequest[],
  
}
export interface Ccflashrequest  {
         validThru:string, 
         cvv:string, 
	     cardRefNumber:any, 
         cardHolderName:string, 
         creditCardNumber:string, 
         validFrom:string, 
  }
  
  
 export interface CcflashrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
