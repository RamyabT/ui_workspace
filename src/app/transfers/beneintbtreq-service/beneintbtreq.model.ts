import { IHttpErrorPayload } from '@fpx/core';
  
export interface BeneintbtreqMaintanence {
  beneintbtreq?: Beneintbtreq[],
  totalRowCount?:number
  data?: Beneintbtreq[],
  
}
export interface Beneintbtreq  {
	     country:any, 
         beneAccount:string, 
         serviceCode:string, 
         city:string, 
         termsFlag:string, 
         beneId:string, 
	     accountCurrency:any, 
         customerCode:string, 
         authOn:string, 
         externalRef:string, 
         createdOn:string, 
         inventoryNumber:string, 
         operationMode:string, 
         modifiedOn:string, 
         confirmAccountNumber:string, 
         paymentmode:string, 
         beneficiaryName:string, 
         addressLine1:string, 
         modifiedBy:string, 
         addressLine2:string, 
         isFavourite:string, 
         entityCode:string, 
         serviceCodeDesc:string, 
         nickName:string, 
         accountNumber:string, 
         benePhoto:string, 
         authBy:string, 
         createdBy:string, 
         beneBank:string, 
         remarks?:string, 
         status:string, 
  }
  
  
 export interface BeneintbtreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
