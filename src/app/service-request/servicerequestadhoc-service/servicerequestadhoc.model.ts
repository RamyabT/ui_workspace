import { IHttpErrorPayload } from '@fpx/core';
import { RequestSubCategory } from '../requestSubCategory-service/requestSubCategory.model';

export interface ServicerequestadhocMaintanence {
  servicerequestadhoc?: Servicerequestadhoc[],
  totalRowCount?:number
  data?: Servicerequestadhoc[],
  
}
export interface Servicerequestadhoc  {
	     Category:any, 
         entityCode:string, 
	     requestTypes:any, 
         subject:string, 
	     servicerequestadhocdtls:any[], 
         authOn:string, 
         message:string, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
         applnCode:string, 
         createdBy:string, 
	     SubCategory:RequestSubCategory, 
         modifiedBy:string, 
         remarks:string, 
  }
  export interface Servicerequestadhocdtls {
    fileName? : string ;
    docInvNumber? : string;
    serialNo? : string;
}	
  
 export interface ServicerequestadhocResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
