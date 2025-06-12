import { IHttpErrorPayload } from '@fpx/core';
  
export interface WalletMaintanence {
  wallet?: Wallet[],
  totalRowCount?:number
  data?: Wallet[],
  
}
export interface Wallet  {
         closeDate:string, 
         country:string, 
         walletName:string, 
         walletType:string, 
         tenantId:string, 
         linkedAccount:string, 
         customerCode:string, 
         walletAccountNumber:string,
         walletTransferType:string,
         currency:string, 
         openDate:string, 
         availableBalance:string, 
         status:string, 
         walletId:string
  }
  
  
 export interface WalletResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
