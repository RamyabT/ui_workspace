import { IHttpErrorPayload } from '@fpx/core';
  
export interface LoadmoneyMaintanence {
  loadmoney?: Loadmoney[],
  totalRowCount?:number
  data?: Loadmoney[],
  
}
export interface Loadmoney  {
         loadMoneyType:string, 
         cvv:string, 
         amount:number, 
         virtualPaymentAddress:string, 
	     cardexpiryyear:any, 
	     iSOCodeList:any, 
         mobileNumber:number, 
         inventoryNumber:string, 
	     cardexpirymonth:any, 
         nameOnCard:string, 
         tenantId:string, 
         loadMoneyMethod:string, 
         applicantId:string, 
         cardNumber:string, 
  }
  
  
 export interface LoadmoneyResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
