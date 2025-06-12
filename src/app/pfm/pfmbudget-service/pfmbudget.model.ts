import { IHttpErrorPayload } from '@fpx/core';
  
export interface PfmbudgetMaintanence {
  pfmbudget?: Pfmbudget[],
  totalRowCount?:number
  data?: Pfmbudget[],
  
}
export interface Pfmbudget  {
	     pfmSubCategory:any, 
         amount:number, 
         endDate:string, 
         customerCode:string, 
         authOn:string, 
         subCategoryCode:string, 
	     categoryCode:any, 
         createdOn:string, 
         categoryName:string, 
	     frequency:any, 
         authBy:string, 
         modifiedOn:string, 
         budgetAmount:any, 
         createdBy:string, 
         tenantId:string, 
         modifiedBy:string, 
         budgetFrequency:string, 
	     currencyCode:any, 
         startDate:string, 
         status:string, 
         operationMode:any;
  }
  
  
 export interface PfmbudgetResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
