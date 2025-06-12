import { IHttpErrorPayload } from '@fpx/core';
  
export interface OfferspublishMaintanence {
  offerspublish?: Offerspublish[],
  totalRowCount?:number
  data?: Offerspublish[],
  
}
export interface Offerspublish  {
         effDate:string, 
         authBy:string, 
         modifiedOn:string, 
	     offerspublishdtls:any, 
         createdBy:string, 
         authOn:string, 
         modifiedBy:string, 
         applicationCode:string, 
         createdOn:string, 
         enabled:string, 
         remarks:string, 
  }
  
  
 export interface OfferspublishResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
