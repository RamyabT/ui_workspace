import { IHttpErrorPayload } from '@fpx/core';
  
export interface WallettranlimitMaintanence {
  wallettranlimit?: Wallettranlimit[],
  totalRowCount?:number
  data?: Wallettranlimit[],
  
}
export interface Wallettranlimit  {
         onlinePurchaseMaxLimit:string, 
         inventoryNumber:string, 
         walletId:string, 
         onlinePurchaseMinLimit:string, 
         scanPayFlag:string, 
         scanPayMaxLimit:string, 
         scanPayMinLimit:string, 
         tenantId:string, 
         customerCode:string, 
         onlinePurchaseLimit:string, 
         onlinePurchaseFlag:string, 
         scanPayLimit:string, 
  }
  
  
 export interface WallettranlimitResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
