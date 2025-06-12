import { IHttpErrorPayload } from '@fpx/core';
  
export interface EstmtrequestMaintanence {
  estmtrequest?: Estmtrequest[],
  totalRowCount?:number
  data?: Estmtrequest[],
  
}
export interface Estmtrequest  {
         entityCode:string, 
         termsFlag:string, 
         errorMessage:string, 
         errorCode:string, 
         updtOn:string, 
         authOn:string, 
	     accountNumber:any, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         additionalEmail:string, 
         createdBy:string, 
         action:string, 
         modifiedBy:string, 
         email:string, 
  }
  
  
 export interface EstmtrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
