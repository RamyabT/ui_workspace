import { IHttpErrorPayload } from '@fpx/core';
  
export interface ResumebackMaintanence {
  resumeback?: Resumeback[],
  totalRowCount?:number
  data?: Resumeback[],
  
}
export interface Resumeback  {
         inventoryNumber:string, 
         emailAddress:string, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
         mobileNumber:string, 
         modifiedBy:string, 
         authOn:string, 
	     resumeOption:any, 
         createdOn:string, 
         onboardingRef:string, 
         status:string, 
  }
  
  
 export interface ResumebackResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
