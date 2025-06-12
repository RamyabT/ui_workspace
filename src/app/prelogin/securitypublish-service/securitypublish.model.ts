import { IHttpErrorPayload } from '@fpx/core';
  
export interface SecuritypublishMaintanence {
  securitypublish?: Securitypublish[],
  totalRowCount?:number
  data?: Securitypublish[],
  
}
export interface Securitypublish  {
         effDate:string, 
         modifiedOn:string, 
         authBy:string, 
         applCode:string, 
         createdBy:string, 
         authOn:string, 
         modifiedBy:string, 
         createdOn:string, 
	     securitypublishdtls:any, 
         remarks:string, 
         enabled:string, 
  }
  
  
 export interface SecuritypublishResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
