import { IHttpErrorPayload } from '@fpx/core';
  
export interface ObvirtualcardtemplateMaintanence {
  obvirtualcardtemplate?: Obvirtualcardtemplate[],
  totalRowCount?:number
  data?: Obvirtualcardtemplate[],
  
}
export interface Obvirtualcardtemplate  {
         cardvalidity:string, 
         wordingTemplate:string, 
         modifiedOn:string, 
         authBy:string, 
         cardimage:string, 
         createdBy:string, 
         authOn:string, 
         modifiedBy:string, 
	     cardtype:any, 
         templateId:number, 
         createdOn:string, 
	     cardform:any, 
  }
  
  
 export interface ObvirtualcardtemplateResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
