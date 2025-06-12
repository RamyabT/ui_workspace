import { IHttpErrorPayload } from '@fpx/core';
  
export interface FatcaConfirmationMaintanence {
  fatcaConfirmation?: FatcaConfirmation[],
  totalRowCount?:number
  data?: FatcaConfirmation[],
  
}
export interface FatcaConfirmation  {
         enabledFlag:string, 
         applicantId:string, 
  }
  
  
 export interface FatcaConfirmationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
