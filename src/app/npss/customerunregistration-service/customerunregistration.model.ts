import { IHttpErrorPayload } from '@fpx/core';
  
export interface CustomerunregistrationMaintanence {
  customerunregistration?: Customerunregistration[],
  totalRowCount?:number
  data?: Customerunregistration[],
  
}
export interface Customerunregistration  {
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         errorDesc:string, 
         createdBy:string, 
         termsFlag:string, 
         errorMessage:string, 
         customerCode:string, 
         errorCode:string, 
         modifiedBy:string, 
         authOn:string, 
         createdOn:string, 
  }
  
  
 export interface CustomerunregistrationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
