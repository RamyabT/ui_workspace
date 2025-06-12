import { IHttpErrorPayload } from '@fpx/core';
  
export interface BicBankMaintanence {
  bicBank?: BicBank[],
  totalRowCount?:number
  data?: BicBank[],
  
}
export interface BicBank  {
         bankCode:string, 
         bankName:string, 
  }
  
  
 export interface BicBankResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
