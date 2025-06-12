import { IHttpErrorPayload } from '@fpx/core';
  
export interface MultibillrequestMaintanence {
  multibillrequest?: Multibillrequest[],
  totalRowCount?:number
  data?: Multibillrequest[],
  
}
export interface Multibillrequest  {
         totalBillAmount:number, 
         debitAccount:string, 
	     chargesCurrency:any, 
         termsFlag:string, 
         accountType:string, 
         rateApplied:number, 
         customerCode:string, 
         chargesAmount:number, 
         authOn:string, 
         tranRef:string, 
         createdOn:string, 
         baseCurrencyAmount:number, 
         authBy:string, 
         modifiedOn:string, 
         baseRateApplied:number, 
         createdBy:string, 
         modifiedBy:string, 
         paymentDate:string, 
	     multibillrequestdetail:any, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface MultibillrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
