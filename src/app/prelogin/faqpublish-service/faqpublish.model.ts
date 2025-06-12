import { IHttpErrorPayload } from '@fpx/core';
  
export interface FaqpublishMaintanence {
  faqpublish?: Faqpublish[],
  totalRowCount?:number
  data?: Faqpublish[],
  
}
export interface Faqpublish  {
         effDate:string, 
         authBy:string, 
         modifiedOn:string, 
	     faqpublishdtls:any, 
         applnCode:string, 
         createdBy:string, 
         authOn:string, 
         modifiedBy:string, 
         enabledflag:string, 
         createdOn:string, 
         remarks:string, 
  }
  
  
 export interface FaqpublishResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
