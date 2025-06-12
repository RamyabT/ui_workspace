import { IHttpErrorPayload } from '@fpx/core';
  
export interface BusinessddreqMaintanence {
  businessddreq?: Businessddreq[],
  totalRowCount?:number
  data?: Businessddreq[],
  
}
export interface Businessddreq  {
	     lastName:any, 
         amount:number, 
	     companyName:any, 
         customerCode:string, 
         businessNumber:string, 
         authOn:string, 
         socialInsuranceNum:string, 
	     accountNumber:any, 
         createdOn:string, 
         inventoryNumber:string, 
	     firstName:any, 
         modifiedOn:string, 
         authBy:string, 
         terms:string, 
         createdBy:string, 
         dob:string, 
         tenantId:string, 
         modifiedBy:string, 
  }
  
  
 export interface BusinessddreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
