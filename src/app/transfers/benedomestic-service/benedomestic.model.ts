import { IHttpErrorPayload } from '@fpx/core';
  
export interface BenedomesticMaintanence {
  benedomestic?: Benedomestic[],
  totalRowCount?:number
  data?: Benedomestic[],
  
}
export interface Benedomestic  {
  beneFullName: any;
		 id: string;
	     country:any, 
         beneAccount:string, 
         serviceCode:string, 
         city:string, 
         termsFlag:string, 
         customerCode:string, 
	     accountCurrency:any, 
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
	     bankCode:any, 
         entityCode:string, 
         nickName:string, 
         accountNumber:string, 
         bankAddress:string, 
	     branchCode:any, 
         benePhoto:string, 
         authBy:string, 
         rejectedBy:string, 
         createdBy:string, 
         rejectedOn:string, 
         routingCode:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface BenedomesticResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
