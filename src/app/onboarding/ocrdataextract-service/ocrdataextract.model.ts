import { IHttpErrorPayload } from '@fpx/core';
  
export interface OcrdataextractMaintanence {
  ocrdataextract?: Ocrdataextract[],
  totalRowCount?:number
  data?: Ocrdataextract[],
  
}
export interface Ocrdataextract  {
         lastName:string, 
         issuedDate:string, 
         gender:string, 
         authOn:string, 
         idNumber:string, 
         createdOn:string, 
         expiryDate:string, 
         modifiedOn:string, 
         modifiedBy:string, 
         applicantId:string, 
         docType:string, 
         udf5:string, 
         udf3:string, 
         udf4:string, 
         udf1:string, 
         udf2:string, 
         firstName:string, 
         issuingAuthority:string, 
         authBy:string, 
	     nationality:any, 
         templateName:string, 
         createdBy:string, 
         dob:string, 
         tenantId:string, 
	     docState:any, 
	     docCountry:any, 
  }
  
  
 export interface OcrdataextractResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
