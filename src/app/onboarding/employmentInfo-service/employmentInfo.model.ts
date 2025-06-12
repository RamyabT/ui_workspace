import { IHttpErrorPayload } from '@fpx/core';
  
export interface EmploymentInfoMaintanence {
  employmentInfo?: EmploymentInfo[],
  totalRowCount?:number
  data?: EmploymentInfo[],
  
}
export interface EmploymentInfo  {
	     companyCode:any, 
         userDefinedField4:string, 
         userDefinedField5:string, 
         annualIncome:string, 
         taxIdNumber:number, 
	     employmentType:any, 
         companyName:string, 
	     empsoi:any, 
	     subemptype:any, 
         userDefinedField1:string, 
         OperatingSince:number, 
         userDefinedField2:string, 
         industryCode:string, 
         userDefinedField3:string, 
	     occupationType:any, 
	     natureofbus:any, 
         workingSince:number, 
         tenantId:string, 
         position:string, 
	     designation:any, 
         applicantId:string, 
         department:string, 
	     empstatus:any, 
  }
  
  
 export interface EmploymentInfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
