import { IHttpErrorPayload } from '@fpx/core';
  
export interface ChequedepositMaintanence {
  chequedeposit?: Chequedeposit[],
  totalRowCount?:number
  data?: Chequedeposit[],
  
}
export interface Chequedeposit  {
         entityCode:string, 
         cbxrTerms:string, 
         serviceCode:string,
         chequeImageBackSide:string, 
         customerCode:string, 
         authOn:string, 
         chequeCurrency:string, 
         createdOn:string, 
         chequeImageFrontSide:string, 
         externalReference:string, 
         inventoryNumber:string, 
         chequeAmount:number, 
         modifiedOn:string, 
         authBy:string, 
         rejectedBy:string, 
         createdBy:string, 
	     depositAccount:any, 
         tenantId:string, 
         depositStatus:string, 
         modifiedBy:string, 
         rejectedOn:string, 
         remarks:string, 
  }
  
  
 export interface ChequedepositResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
