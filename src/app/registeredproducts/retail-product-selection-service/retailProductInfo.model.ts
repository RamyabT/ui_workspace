import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailProductInfoMaintanence {
  productInfo?: RetailProductInfo[],
  totalRowCount?:number
  data?: RetailProductInfo[],
  
}
export interface RetailProductInfo  {
         detailDesc:string, 
         imageContent:string, 
         kfsTextContent:string, 
         authBy:string, 
         modifiedOn:string, 
	     productId:any, 
         createdBy:string, 
         shortDesc:string, 
         authOn:string, 
         modifiedBy:string, 
         createdOn:string, 
  }
  
  
 export interface RetailProductInfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
