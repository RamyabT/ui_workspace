import { IHttpErrorPayload } from '@fpx/core';
  
export interface NpsssendmoneyMaintanence {
  npsssendmoney?: Npsssendmoney[],
  totalRowCount?:number
  data?: Npsssendmoney[],
  
}
export interface Npsssendmoney  {
         beneType:string, 
         receipientAccNumber:string, 
         lastName:string, 
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
         transactionAmount:any, 
         modifiedBy:string, 
         remarks:string, 
         email:string, 
  }
  
  
 export interface NpsssendmoneyResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
