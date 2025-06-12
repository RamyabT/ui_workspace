import { IHttpErrorPayload } from '@fpx/core';
  
export interface BeneinternalMaintanence {
  beneinternal?: Beneinternal[],
  totalRowCount?:number
  data?: Beneinternal[],
  
}
export interface Beneinternal  {
      id:any
	     country:any, 
         beneAccount:string, 
         serviceCode:string, 
         city:string, 
         termsFlag:string, 
	     accountCurrency:any, 
         customerCode:string, 
         authOn:string, 
         externalRef:string, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         confirmAccountNumber:string, 
         paymentmode:string, 
         bankDescription:string, 
         beneficiaryName:string, 
         addressLine1:string, 
         modifiedBy:string, 
         addressLine2:string, 
         branchDescription:string, 
         isFavourite:string, 
         bankCode:string, 
         entityCode:string, 
         nickName:string, 
         accountNumber:string, 
         benePhoto:string, 
         branchCode:string, 
         authBy:string, 
         rejectedBy:string, 
         createdBy:string, 
         rejectedOn:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface BeneinternalResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
