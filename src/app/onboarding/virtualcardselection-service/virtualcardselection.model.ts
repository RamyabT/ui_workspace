import { IHttpErrorPayload } from '@fpx/core';
  // import {  Obvirtualcardtemplate } from '../virtualcardTemplateRoGrid/obvirtualcard-template-ro-grid.model';

export interface VirtualcardselectionMaintanence {
  virtualcardselection?: Virtualcardselection[],
  totalRowCount?:number
  data?: Virtualcardselection[],
  
}
export interface Virtualcardselection  {
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
         tenantId:string, 
         authOn:string, 
         modifiedBy:string, 
         applicantId:string, 
         templateId:number, 
         createdOn:string, 
         isskipped:string, 
  }
  
  
 export interface VirtualcardselectionResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
