import { IHttpErrorPayload } from '@fpx/core';
  
export interface BeneaedreqMaintanence {
  beneaedreq?: Beneaedreq[],
  totalRowCount?:number
  data?: Beneaedreq[],
  
}
export interface Beneaedreq  {
	     country:any, 
         beneAccount:string, 
	     beneAccType:any, 
         city:string, 
         serviceCode:string, 
         termsFlag:string, 
         beneId:string, 
         customerCode:string, 
         authOn:string, 
         intermediaryBank:string, 
         externalRef:string, 
         createdOn:string, 
	     bankCountry:any, 
         inventoryNumber:string, 
         operationMode:string, 
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
         serviceCodeDesc:string, 
         nickName:string, 
	     beneCountry:any, 
         accountNumber:string, 
         bankAddress:string, 
         conAccNumber:string, 
         branchCode:string, 
         benePhoto:string, 
         authBy:string, 
         createdBy:string, 
         iban:string, 
         beneBank:string, 
         bic:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface BeneaedreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
