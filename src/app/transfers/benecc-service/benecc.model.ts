import { IHttpErrorPayload } from '@fpx/core';
  
export interface BeneccMaintanence {
  benecc?: Benecc[],
  totalRowCount?:number
  data?: Benecc[],
  
}
export interface Benecc  {
        id:any,
	     country:any, 
         beneAccount:string, 
         serviceCode:string, 
         city:string, 
         termsFlag:string, 
         branchAddress:string, 
         customerCode:string, 
         authOn:string, 
         externalRef:string, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         paymentmode:string, 
         bankDescription:string, 
         beneficiaryName:string, 
         addressLine1:string, 
         modifiedBy:string, 
         addressLine2:string, 
         branchDescription:string, 
	     beneCurrency:any, 
         isFavourite:string, 
         bankCode:string, 
         entityCode:string, 
         nickName:string, 
         branchCode:string, 
         benePhoto:string, 
         authBy:string, 
         rejectedBy:string, 
         createdBy:string, 
         creditCardNumber:string, 
         rejectedOn:string, 
	     bic:any, 
         remarks:string, 
         status:string, 
         ccNumber:string
  }
  
  
 export interface BeneccResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
