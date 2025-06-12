import { IHttpErrorPayload } from '@fpx/core';
  
export interface PaymentsystemMaintanence {
  paymentsystem?: Paymentsystem[],
  totalRowCount?:number
  data?: Paymentsystem[],
  
}
export interface Paymentsystem  {
         authBy:string, 
         modifiedOn:string, 
	     ps:any, 
         systemCode:string, 
         paymentCategory:string, 
         createdBy:string, 
         description:string, 
         authOn:string, 
         modifiedBy:string, 
         createdOn:string, 
         shortCode:string, 
         enabled:string, 
  }
  
  
 export interface PaymentsystemResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
