import { IHttpErrorPayload } from '@fpx/core';
  
export interface PaymentsettingMaintanence {
  paymentsetting?: Paymentsetting[],
  totalRowCount?:number
  data?: Paymentsetting[],
  
}
export interface Paymentsetting  {
         poslimit:number, 
         inventoryNumber:string, 
         issueCard:any, 
         contactLessPay:string, 
         pos:string, 
         themeCode:string, 
         tenantId:string, 
         contactlesspayment:number, 
         atmlimit:number, 
         atm:string, 
         tranauthlimit:number, 
         scanandPayAllowed:any,
         contactlesspaymentLimit:any,
         dailTranLimit:any,
         maxTranLimit:any
  }
  
  
 export interface PaymentsettingResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
