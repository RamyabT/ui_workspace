import { IHttpErrorPayload } from '@fpx/core';
  
export interface CcCancelMaintanence {
  ccCancel?: CcCancel[],
  totalRowCount?:number
  data?: CcCancel[],
  
}
export interface CcCancel  {
	     reason:any, 
         entityCode:string, 
         errorMessage:string, 
         requestReference:string, 
         errorCode:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
	     cardRefNumber:any, 
         terms:string, 
         createdBy:string, 
         modifiedBy:string, 
         remarks:string, 
  }
  
  
 export interface CcCancelResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
