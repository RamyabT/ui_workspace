import { IHttpErrorPayload } from '@fpx/core';
  
export interface BeneccreqMaintanence {
  beneccreq?: Beneccreq[],
  totalRowCount?:number
  data?: Beneccreq[],
  
}
export interface Beneccreq  {
	     country:any, 
         beneAccount:string, 
         serviceCode:string, 
         city:string, 
         confirmCreditCardNumber:string, 
         termsFlag:string, 
         beneId:string, 
         branchAddress:string, 
         customerCode:string, 
         authOn:string, 
         externalRef:string, 
         createdOn:string, 
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
	     beneCurrency:any, 
         isFavourite:string, 
         bankCode:string, 
         entityCode:string, 
         serviceCodeDesc:string, 
         nickName:string, 
         branchCode:string, 
         benePhoto:string, 
         authBy:string, 
         createdBy:string, 
         creditCardNumber:string, 
         beneBank:string, 
	     bic:any, 
         remarks:string, 
         status:string, 
         ccNumber:string
  }
  
  
 export interface BeneccreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
