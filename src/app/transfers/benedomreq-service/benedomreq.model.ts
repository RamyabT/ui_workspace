import { IHttpErrorPayload } from '@fpx/core';
  
export interface BenedomreqMaintanence {
  benedomreq?: Benedomreq[],
  totalRowCount?:number
  data?: Benedomreq[],
  
}
export interface Benedomreq  {
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
         paymentmode:string, 
         bankDescription:string, 
         beneficiaryName:string, 
         addressLine1:string, 
         modifiedBy:string, 
         addressLine2:string, 
         branchDescription:string, 
         isFavourite:string, 
	     bankCode:any, 
         entityCode:string, 
         serviceCodeDesc:string, 
         nickName:string, 
         accountNumber:string, 
         bankAddress:string, 
	     branchCode:any, 
         benePhoto:string, 
         authBy:string, 
         createdBy:string, 
         beneBank:string, 
         confimrAccountNumber:string, 
         routingCode:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface BenedomreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
