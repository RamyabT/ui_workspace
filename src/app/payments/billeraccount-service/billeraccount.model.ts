import { IHttpErrorPayload } from '@fpx/core';
  
export interface BilleraccountMaintanence {
  billeraccount?: Billeraccount[],
  totalRowCount?:number
  data?: Billeraccount[],
  
}
export interface Billeraccount  {
	     billerId:any, 
         entityCode:string, 
         debitAccount:string, 
         nickName:string, 
         accountType:string, 
         authOn:string, 
         userId:string, 
         createdOn:string, 
         billerCreditAccount:string, 
         smartPay:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         billerBeneficiaryId:string, 
	     billeraccountparam:any, 
         modifiedBy:string, 
	     currencyCode:any, 
         status:string, 
         remarks:string
  }
  
  
 export interface BilleraccountResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
