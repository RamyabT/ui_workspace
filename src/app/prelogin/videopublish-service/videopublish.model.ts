import { IHttpErrorPayload } from '@fpx/core';
  
export interface VideopublishMaintanence {
  videopublish?: Videopublish[],
  totalRowCount?:number
  data?: Videopublish[],
  
}
export interface Videopublish  {
	     videopublishdtls:any, 
         effDate:string, 
         authBy:string, 
         modifiedOn:string, 
         applCode:string, 
         createdBy:string, 
         modifiedBy:string, 
         authOn:string, 
         createdOn:string, 
         enabled:string, 
         remarks:string, 
  }
  
  
 export interface VideopublishResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
