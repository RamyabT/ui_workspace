import { IHttpErrorPayload } from '@fpx/core';
  
export interface ChangepasswordMaintanence {
  changepassword?: Changepassword[],
  totalRowCount?:number
  data?: Changepassword[],
  
}
export interface Changepassword  {
        //  inventoryNo:string, 
        //  authBy:string, 
        //  modifiedOn:string, 
         confirmPass?:string, 
        //  createdBy:string, 
         newPass:string, 
        //  authOn:string, 
        //  modifiedBy:string, 
        //  createdOn:string, 
         currentPass:string, 
  }
  
  
 export interface ChangepasswordResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
