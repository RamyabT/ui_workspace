import { IHttpErrorPayload } from '@fpx/core';
  
export interface ResetPasswordMaintanence {
  ResetPassword?: ResetPassword[],
  totalRowCount?:number
  data?: ResetPassword[],
  
}
export interface ResetPassword  {
  newPassword:string,
  confirmPassword:string,
  reqRef:string
  }
  
  
 export interface ResetPasswordResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
