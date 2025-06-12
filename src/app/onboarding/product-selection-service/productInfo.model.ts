import { IHttpErrorPayload } from '@fpx/core';
  
export interface ProductInfoMaintanence {
  productInfo?: ProductInfo[],
  totalRowCount?:number
  data?: ProductInfo[],
  
}
export interface ProductInfo  {
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
  
  
 export interface ProductInfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
