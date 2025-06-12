import { IHttpErrorPayload } from '@fpx/core';
  
export interface InvestmentHoldingsMaintanence {
  investmentHoldings?: InvestmentHoldings[],
  totalRowCount?:number
  data?: InvestmentHoldings[],
  
}
export interface InvestmentHoldings  {
         symbol:string, 
         securityName:string, 
         marketPrice:string, 
         quantity:string, 
         price:string, 
         tenantId:string, 
         customerCode:string, 
         accountNumber:string, 
  }
  
  
 export interface InvestmentHoldingsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
