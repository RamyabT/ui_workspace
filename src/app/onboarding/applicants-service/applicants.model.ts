import { IHttpErrorPayload } from '@fpx/core';
  
export interface ApplicantsMaintanence {
  applicants?: Applicants[],
  totalRowCount?:number
  data?: Applicants[],
  
}
export interface Applicants  {
         lastName:string, 
	     gender:any, 
	     iSOCodeList:any, 
	     channel:any, 
         authOn:string, 
         title:string, 
	     suffix:any, 
         createdOn:string, 
         emailAddress:string, 
         modifiedOn:string, 
         captcha:string, 
         terms:string, 
         modifiedBy:string, 
         applicantId:string, 
	     residentstatus:any, 
         udf5:string, 
         fullName:string, 
         udf3:string, 
         udf4:string, 
         udf1:string, 
         udf2:string, 
         firstName:string, 
         mobileNum:number, 
         authBy:string, 
	     nationality:any, 
         createdBy:string, 
         dob:string, 
         tenantId:string, 
         middleName:string, 
         terms3:string, 
         terms2:string, 
	     productselection:{
        product : {
          productCode : string
        },
        productSegment : string
       }, 
	     maritalStatus:any,
  }
  
  
 export interface ApplicantsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
