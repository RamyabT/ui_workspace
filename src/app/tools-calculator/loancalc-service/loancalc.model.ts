import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoancalcMaintanence {
  loancalc?: Loancalc[],
  totalRowCount?:number
  data?: Loancalc[],
  
}
export interface Loancalc  {
	     loanType:any, 
         requestDate:string, 
         vehicleCost:number, 
         propertyValue:number, 
         downPaymentAmount:number, 
         loanAmount:number, 
         tenure:string, 
  }
  
  
 export interface LoancalcResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
