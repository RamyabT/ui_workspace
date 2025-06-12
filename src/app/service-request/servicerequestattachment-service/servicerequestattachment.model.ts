import { IHttpErrorPayload } from '@fpx/core';
  
export interface ServicerequestattachmentMaintanence {
  servicerequestattachment?: Servicerequestattachment[],
  totalRowCount?:number
  data?: Servicerequestattachment[],
  
}
export interface Servicerequestattachment  {
         inventoryNumber:string, 
         stage:string,
         serviceRequestNumber:string, 
         applnCode:string, 
	    //  servicereqcommentsattachement:Servicereqcommentsattachement[], 
      servicereqcommentsattachement:any[], 
         updatedOn:string, 
         commentedBy:string, 
         messageContent:string, 
  }
  
  
 export interface ServicerequestattachmentResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
