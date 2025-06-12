import { IHttpErrorPayload } from '@fpx/core';
  
export interface ObapplicantprofileMaintanence {
  obapplicantprofile?: Obapplicantprofile[],
  totalRowCount?:number
  data?: Obapplicantprofile[],
  
}
export interface Obapplicantprofile  {
         password:string, 
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         confirmPassword:string, 
         authOn:string, 
         modifiedBy:string, 
         applicantId:string, 
         userName:string, 
         createdOn:string, 
  }
  
  
 export interface ObapplicantprofileResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
