import { IHttpErrorPayload } from '@fpx/core';
  
export interface FxratesMaintanence {
  viewfxrate?: Fxrates[],
  totalRowCount?:number
  data?: Fxrates[],
  
}
export interface Fxrates  {
         amount:number, 
         sellRate:number, 
         midRate:number, 
         toCurrency:string, 
         fromCurrency:string, 
         buyRate:number, 
  }
  
  
 export interface FxratesResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
