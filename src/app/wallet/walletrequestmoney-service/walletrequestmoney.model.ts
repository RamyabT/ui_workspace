import { IHttpErrorPayload } from '@fpx/core';
  
export interface WalletrequestmoneyMaintanence {
  walletrequestmoney?: Walletrequestmoney[],
  totalRowCount?:number
  data?: Walletrequestmoney[],
  
}
export interface Walletrequestmoney  {
  toAccName: any;
  fromAccName: string;
         fromCustomerCode:any, 
         amount:string, 
	     toAccount:any, 
         mobileNumber:string, 
	     walletCurr:any, 
         towalletId:string, 
	     fromAccount:any, 
         fromwalletId:string, 
         inventoryNumber:string, 
         charges:number, 
         chargesAmount: any,
	     chargesCur:any, 
         tenantId:string, 
         toCustomerCode:string, 
         remarks:any, 
         requestDate:any,
         status:any
  }
  
  
 export interface WalletrequestmoneyResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
