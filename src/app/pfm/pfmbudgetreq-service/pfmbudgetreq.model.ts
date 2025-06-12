import { IHttpErrorPayload } from '@fpx/core';
  
export interface PfmbudgetreqMaintanence {
  pfmbudgetreq?: Pfmbudgetreq[],
  totalRowCount?:number
  data?: Pfmbudgetreq[],
  
}
export interface Pfmbudgetreq  {
         endDate:string, 
         customerCode:string, 
	     subCategoryCode:any, 
         authOn:string, 
	     categoryCode:any, 
         categoryName:string, 
         createdOn:string, 
         mode:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         budgetAmount:number, 
         createdBy:string, 
         tenantId:string, 
         modifiedBy:string, 
	     budgetFrequency:any, 
         currencyCode:string, 
         startDate:string, 
         status:string, 
         operationMode: string
  }
  
  
 export interface PfmbudgetreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
