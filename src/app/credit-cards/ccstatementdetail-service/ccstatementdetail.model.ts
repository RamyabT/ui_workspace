import { IHttpErrorPayload } from '@fpx/core';
  
export interface CcstatementdetailMaintanence {
  ccstatementdetail?: Ccstatementdetail[],
  totalRowCount?:number
  data?: Ccstatementdetail[],
  
}
export interface Ccstatementdetail  {
         transactionCurrency:string, 
         transactionCat:string, 
         transactionReference:string, 
         merchantId:string, 
         dbcrFlag:string, 
         transactionAmount:number, 
         transactionDescription:string, 
         valueDate:string, 
         transactionDate:string, 
         transactionRemarks:string, 
  }
  
  
 export interface CcstatementdetailResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
