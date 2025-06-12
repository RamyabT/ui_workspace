import { IHttpErrorPayload } from '@fpx/core';
  // import {  ProdAllowedDocs } from '../../referencedata/prodAllowedDocs-input-grid/prodAllowedDocs-input-grid.model';

export interface DocumentchecklistMaintanence {
  documentchecklist?: Documentchecklist[],
  totalRowCount?:number
  data?: Documentchecklist[],
  
}
export interface Documentchecklist  {
	    //  documents:ProdAllowedDocs[], 
         tenantId:string, 
  }
  
  
 export interface DocumentchecklistResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
