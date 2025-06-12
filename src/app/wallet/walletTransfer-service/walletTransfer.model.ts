import { IHttpErrorPayload } from '@fpx/core';
  
export interface WalletTransferMaintanence {
  walletTransfer?: WalletTransfer[],
  totalRowCount?:number
  data?: WalletTransfer[],
  
}
export interface WalletTransfer  {
  operationMode:string,
  fulfillRefNum:string,
	     creditWalletAccount:any, 
         serviceCode:string, 
	     workflowDetails:any, 
         termsFlag:string, 
	     sourceWalletAccount:any, 
         customerCode:string, 
         authOn:string, 
         exchangeAmount:number, 
         paymentAmount:any, 
         createdOn:string, 
         modifiedOn:string, 
         exchangeRate:number, 
         creditWalletId:string, 
         paymentId:string, 
         modifiedBy:string, 
         fromCurrency:string, 
         transactionReference:string, 
         chargesAmount:number, 
         debitAmount:number, 
         authBy:string, 
         baseRate:number, 
         createdBy:string, 
         toCurrency:string, 
         tenantId:string, 
         transferType:string, 
         paymentCurrency:string, 
         paymentDate:string, 
         creditAmount:number, 
         remarks:string, 
         charges:any,
         mode:any
  }
  
  
 export interface WalletTransferResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
