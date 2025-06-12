import { IHttpErrorPayload } from '@fpx/core';
  
export interface RpcontractbeneficiaryinfoMaintanence {
  rpcontractbeneficiaryinfo?: Rpcontractbeneficiaryinfo[],
  totalRowCount?:number
  data?: Rpcontractbeneficiaryinfo[],
  
}
export interface Rpcontractbeneficiaryinfo  {
         inventoryNumber:string, 
	     firstname:any, 
         beneSerial:string, 
         proportion:string, 
         initial:string, 
         tenantId:string, 
	     relationship:any, 
	     lastname:any, 
  }
  
  
 export interface RpcontractbeneficiaryinfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
