import { IHttpErrorPayload } from '@fpx/core';
  
export interface UseralertcfgMaintanence {
  useralertcfg?: Useralertcfg[],
  totalRowCount?:number
  data?: Useralertcfg[],
  
}
export interface Useralertcfg  {
         authBy:string, 
         modifiedOn:string, 
	     useralertservices:any, 
         createdBy:string, 
         authOn:string, 
         modifiedBy:string, 
	     useralertchannels:any, 
         userId:string, 
         createdOn:string, 
         enabled:string, 
         alertCategory:string, 
  }
  
  
 export interface UseralertcfgResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
