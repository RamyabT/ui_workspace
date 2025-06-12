import { IHttpErrorPayload } from '@fpx/core';
  
export interface UpcomingbillMaintanence {
  upcomingbill?: Upcomingbill[],
  totalRowCount?:number
  data?: Upcomingbill[],
  
}
export interface Upcomingbill  {
	     billerId:any, 
         dueDate:string, 
         customerCode:string, 
         lateFeeAmount:number, 
         authOn:string, 
         billerName:string, 
         billReference:string, 
         createdOn:string, 
         expiryDate:string, 
         authBy:string, 
         modifiedOn:string, 
         dueAmount:number, 
         totalDueAmount:number, 
         createdBy:string, 
         billerBeneficiaryId:string, 
         currency:string, 
         modifiedBy:string, 
         billNumber:string, 
         issueDate:string, 
         status:string, 
  }
  
  
 export interface UpcomingbillResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
