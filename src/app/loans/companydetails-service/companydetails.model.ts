import { IHttpErrorPayload } from '@fpx/core';
  
export interface CompanydetailsMaintanence {
  companydetails?: Companydetails[],
  totalRowCount?:number
  data?: Companydetails[],
  
}
export interface Companydetails  {
         inventoryNumber:string, 
         registeredAddress:string, 
         operationsStartDate:string, 
         contactName:string, 
         registrationNumber:string, 
         companyName:string, 
         contactNumber:number, 
         businessEmailId:string, 
         taxNumber:string, 
         turnOver:string, 
         employeeCount:string, 
	     industryCode:any, 
  }
  
  
 export interface CompanydetailsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
