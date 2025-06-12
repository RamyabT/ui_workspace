import { IHttpErrorPayload } from '@fpx/core';
  
export interface TaxformsMaintanence {
  taxforms?: Taxforms[],
  totalRowCount?:number
  data?: Taxforms[],
  
}
export interface Taxforms  {
         dateOfGeneration:string, 
         dateTo:string, 
         recentDocCount:string, 
         taxformName:string, 
         fileReference:string, 
         dateFrom:string, 
  }
  
  
 export interface TaxformsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
