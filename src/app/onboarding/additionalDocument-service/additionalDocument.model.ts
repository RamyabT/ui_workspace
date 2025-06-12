import { IHttpErrorPayload } from '@fpx/core';
  
export interface AdditionalDocumentMaintanence {
  additionalDocument?: AdditionalDocument[],
  totalRowCount?:number
  data?: AdditionalDocument[],
  
}
export interface AdditionalDocument  {
         tenantId:string, 
         dualNationalityHolderFlag:string, 
         applicantId:string, 
  }
  
  
 export interface AdditionalDocumentResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
