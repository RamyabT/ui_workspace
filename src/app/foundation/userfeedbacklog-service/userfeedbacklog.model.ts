import { IHttpErrorPayload } from '@fpx/core';
  
export interface UserfeedbacklogMaintanence {
  userfeedbacklog?: Userfeedbacklog[],
  totalRowCount?:number
  data?: Userfeedbacklog[],
  
}
export interface Userfeedbacklog  {
         inventoryNumber?:string, 
         appVersion?:string, 
         feedBackDate?:string, 
         rating?:string, 
         channel?:string, 
         customerCode?:string, 
         userId?:string, 
         feedBackComments?:string, 
  }
  
  
 export interface UserfeedbacklogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
