import { IHttpErrorPayload } from '@fpx/core';
  
export interface ChangepassMaintanence {
  changepass?: Changepass[],
  totalRowCount?:number
  data?: Changepass[],
  
}
export interface Changepass  {
  oldPassword:string,
  newPassword:string,
  confirmPassword?:string,
  ticket:string,
  reqRef:string
  }
  
  
 export interface ChangepassResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
