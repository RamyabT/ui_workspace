import { IHttpErrorPayload } from '@fpx/core';
  
export interface BilleraccountreqMaintanence {
  billeraccountreq?: Billeraccountreq[],
  totalRowCount?:number
  data?: Billeraccountreq[],
  
}
export interface Billeraccountreq  {
	     billerId:any, 
         entityCode:string, 
         debitAccount?:string, 
         termsFlag:string, 
         nickName:string, 
         accountType?:string, 
         authOn:string, 
         userId:string, 
         createdOn:string, 
         billerCreditAccount:string, 
         smartPay:string, 
         inventoryNumber?:string, 
         operationMode:string, 
         authBy:string, 
         modifiedOn:string, 
	     billeraccountparamreq:any, 
         createdBy:string, 
         billerBeneficiaryId:string, 
         modifiedBy:string, 
	     currencyCode:any, 
         remarks:string, 
         status:string, 
         creditCardAccounts?:string
  }
  
  
 export interface BilleraccountreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
