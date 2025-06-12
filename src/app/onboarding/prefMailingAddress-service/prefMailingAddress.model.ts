import { IHttpErrorPayload } from '@fpx/core';
  
export interface PrefMailingAddressMaintanence {
  prefMailingAddress?: PrefMailingAddress[],
  totalRowCount?:number
  data?: PrefMailingAddress[],
  
}
export interface PrefMailingAddress  {
         salaryOrMonthlyIncome:string, 
         preferredMailingAddress:string, 
         dualNationalityHolder:string, 
	     mainSourceOfIncome:any, 
	     otherNationality:any, 
         prefAnnualIncome:string, 
	     preferredPurposeOfAccount:any, 
         applicantId:string, 
         pepDeclaration:string, 
         countryOfResidence:string, 
	     preferredBranch:any, 
         prefMaritalStatus:string, 
  }
  
  
 export interface PrefMailingAddressResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
