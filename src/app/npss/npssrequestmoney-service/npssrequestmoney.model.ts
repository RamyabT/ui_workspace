import { IHttpErrorPayload } from '@fpx/core';
  
export interface NpssrequestmoneyMaintanence {
  npssrequestmoney?: Npssrequestmoney[],
  totalRowCount?:number
  data?: Npssrequestmoney[],
  
}
export interface Npssrequestmoney  {
         beneType:string, 
         lastName:string, 
         receipientAccNumber:string, 
	     transactionCurrency:any, 
         mobileNumber:string, 
         receipientCustomerId:string, 
         authOn:string, 
         createdOn:string, 
         beneValue:string, 
         inventoryNumber:string, 
         firstName:string, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
         senderCustomerCode:string, 
         iban:string, 
         transactionAmount:number, 
         modifiedBy:string, 
         remarks:string, 
         email:string, 
  }
  
  
 export interface NpssrequestmoneyResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
