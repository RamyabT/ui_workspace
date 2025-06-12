import { IHttpErrorPayload } from '@fpx/core';
  
export interface StopchequeMaintanence {
  stopcheque?: Stopcheque[],
  totalRowCount?:number
  data?: Stopcheque[],
  
}
export interface Stopcheque  {
         chequeAmount:number, 
         payeeName:string, 
	     reason:any, 
         relatedReference:string, 
         toChequeNumber:number, 
         accountNumber:string, 
         chequeNumber:number, 
         issueDate:string, 
         fromChequeNumber:number, 
         stopDate:string, 
         remarks:string, 
         status:string, 
         currency: string
  }
  
  
 export interface StopchequeResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
