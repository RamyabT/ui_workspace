import { IHttpErrorPayload } from '@fpx/core';
  
export interface BeneaedMaintanence {
  beneaed?: Beneaed[],
  totalRowCount?:number
  data?: Beneaed[],
  
}
export interface Beneaed  {
	     country:any, 
         beneAccount:string, 
	     beneAccType:any, 
         city:string, 
         serviceCode:string, 
         termsFlag:string, 
         customerCode:string, 
         authOn:string, 
	     intermediaryBank:any, 
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
         isFavourite:string, 
         bankCode:string, 
         entityCode:string, 
         nickName:string, 
	     bankcountry:any, 
	     beneCountry:any, 
         accountNumber:string, 
         bankAddress:string, 
         conAccNumber:string, 
         branchCode:string, 
         benePhoto:string, 
         authBy:string, 
         rejectedBy:string, 
         createdBy:string, 
         iban:string, 
         rejectedOn:string, 
         bic:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface BeneaedResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
