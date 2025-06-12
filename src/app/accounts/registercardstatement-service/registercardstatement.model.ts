import { IHttpErrorPayload } from '@fpx/core';

export interface RegistercardstatementMaintanence {
  registercardstatement?: Registercardstatement[],
  totalRowCount?:number
  data?: Registercardstatement[],
  
}
export interface Registercardstatement  {
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
	     cards:any, 
         createdBy:string, 
         termsFlag:string, 
         tenantId:string, 
         customerCode:string, 
         emailId:string, 
         authOn:string, 
         modifiedBy:string, 
         createdOn:string, 
  }
  
  
 export interface RegistercardstatementResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
