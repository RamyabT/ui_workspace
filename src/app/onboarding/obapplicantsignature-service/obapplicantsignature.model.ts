import { IHttpErrorPayload } from '@fpx/core';
  
export interface ObapplicantsignatureMaintanence {
  obapplicantsignature?: Obapplicantsignature[],
  totalRowCount?:number
  data?: Obapplicantsignature[],
  
}
export interface Obapplicantsignature  {
         authBy:string, 
         modifiedOn:string, 
         createdBy:string, 
         signatureImage:string, 
         docCapture: string,
         authOn:string, 
         modifiedBy:string, 
         applicantId:string, 
         createdOn:string, 
  }
  
  
 export interface ObapplicantsignatureResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
