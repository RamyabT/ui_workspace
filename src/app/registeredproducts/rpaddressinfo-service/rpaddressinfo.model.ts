import { IHttpErrorPayload } from '@fpx/core';
  
export interface RpaddressinfoMaintanence {
  rpaddressinfo?: Rpaddressinfo[],
  totalRowCount?:number
  data?: Rpaddressinfo[],
  
}
export interface Rpaddressinfo  {
         inventoryNumber:string, 
	     country:any, 
         pobox:string, 
	     province:any, 
	     city:any, 
         street:string, 
         postalCode:string, 
         tenantId:string, 
	     rpaddressType:any, 
  }
  
  
 export interface RpaddressinfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
