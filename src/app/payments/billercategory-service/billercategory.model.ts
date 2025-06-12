import { IHttpErrorPayload } from '@fpx/core';
  
export interface BillercategoryMaintanence {
  billercategory?: Billercategory[],
  totalRowCount?:number
  data?: Billercategory[],
  
}
export interface Billercategory  {
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         description:string, 
         authOn:string, 
         modifiedBy:string, 
         categoryCode:string, 
         shortDescription:string, 
         billercatIcon:string, 
         createdOn:string, 
	     groupCode:any, 
  }
  
  
 export interface BillercategoryResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
