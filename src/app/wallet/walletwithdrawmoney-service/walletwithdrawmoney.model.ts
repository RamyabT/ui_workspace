import { IHttpErrorPayload } from '@fpx/core';
  
export interface WalletwithdrawmoneyMaintanence {
  walletwithdrawmoney?: Walletwithdrawmoney[],
  totalRowCount?:number
  data?: Walletwithdrawmoney[],
  
}
export interface Walletwithdrawmoney  {
	     toAccount:any, 
         serviceCode:string, 
	     workflowDetails:any, 
         termsFlag:string, 
         customerCode:string, 
         authOn:string, 
         exchangeAmount:number, 
         paymentAmount:any, 
         createdOn:string, 
         modifiedOn:string, 
         exchangeRate:number, 
         paymentId:string, 
         modifiedBy:string, 
         isBalanceTransfer:string, 
         transactionReference:string, 
         chargesAmount:any, 
         debitAmount:number, 
         authBy:string, 
         baseRate:number, 
         createdBy:string, 
	     walletAccount:any, 
         tenantId:string, 
         paymentCurrency:string, 
         paymentDate:string, 
         creditAmount:number, 
         remarks:string, 
         charges:any;
  
}
 export interface WalletwithdrawmoneyResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
