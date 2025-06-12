import { IHttpErrorPayload } from '@fpx/core';
  
export interface WalletaddmoneyMaintanence {
  walletaddmoney?: Walletaddmoney[],
  totalRowCount?:number
  data?: Walletaddmoney[],
  
}
export interface Walletaddmoney  {
         serviceCode:string, 
         termsFlag:string, 
	     fromAccount:any, 
         customerCode:string, 
         authOn:string, 
         exchangeAmount:number, 
         paymentAmount:number, 
         createdOn:string, 
         modifiedOn:string, 
         exchangeRate:number, 
         paymentId:string, 
         modifiedBy:string, 
         fromCurrency:string, 
         transactionReference:string, 
         chargesAmount:number, 
         debitAmount:string, 
         authBy:string, 
         baseRate:number, 
         createdBy:string, 
         toCurrency:string, 
	     walletAccount:any, 
         tenantId:string, 
         paymentCurrency:string, 
         paymentDate:string, 
         creditAmount:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface WalletaddmoneyResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
