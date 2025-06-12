import { IHttpErrorPayload } from '@fpx/core';
import { Taxstatementdocupload } from '../taxstatementdocupload-service/taxstatementdocupload.model';
  
export interface TaxstatementreqMaintanence {
  taxstatementreq?: Taxstatementreq[],
  totalRowCount?:number
  data?: Taxstatementreq[],
  
}
export interface Taxstatementreq  {
         acknowledgement:string, 
         errorDesc:string, 
	     year:any, 
         chargesAmount:number, 
         errorCode:string, 
         updtOn:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
	     Month:any, 
         modifiedOn:string, 
         authBy:string, 
         terms:string, 
         createdBy:string, 
         taxRegistrationNumber:string, 
         modifiedBy:string, 
         remarks:string, 
	     supportingDocuments:Taxstatementdocupload[], 
  }
  
  
 export interface TaxstatementreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
