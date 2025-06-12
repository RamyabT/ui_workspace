import { IHttpErrorPayload } from '@fpx/core';
import { Othercountrytaxinfo } from 'src/app/onboarding/othercountry-taxinfo-inputgrid/othercountry-taxinfo-inputgrid.model';
  // import {  Othercountrytaxinfo } from '../../foundation/othercountry-taxinfo-inputgrid/othercountry-taxinfo-inputgrid.model';

export interface DocumentChecklistMaintanence {
  documentChecklist?: DocumentChecklist[],
  totalRowCount?:number
  data?: DocumentChecklist[],
  
}
export interface DocumentChecklist  {
         applicantId:string, 
  }
  
  
 export interface DocumentChecklistResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
