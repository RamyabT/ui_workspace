import { IHttpErrorPayload } from '@fpx/core';
  
export interface TermspublishMaintanence {
  termspublish?: Termspublish[],
  totalRowCount?:number
  data?: Termspublish[],
  
}
export interface Termspublish  {
         effDate:string, 
         authBy:string, 
         modifiedOn:string, 
         applCode:string, 
         serviceCode:string, 
         createdBy:string, 
         enabledFlag:string, 
         modifiedBy:string, 
         authOn:string, 
	     termsInventoryNumber:any, 
         createdOn:string, 
  }
  
  
 export interface TermspublishResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
