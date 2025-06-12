import { IHttpErrorPayload } from '@fpx/core';
  
export interface UpdatedocumentreqMaintanence {
  updatedocumentreq?: Updatedocumentreq[],
  totalRowCount?:number
  data?: Updatedocumentreq[],
  
}
export interface Updatedocumentreq  {
         entityCode:string, 
	     updatedocbackimg:any, 
         customerCode:string, 
         authOn:string, 
	     idNumber:any, 
         createdOn:string, 
         expiryDate:string, 
	     updatedocfrontimg:any, 
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
         uploadType:string, 
         modifiedBy:string, 
	     id:any, 
  }
  
  
 export interface UpdatedocumentreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
