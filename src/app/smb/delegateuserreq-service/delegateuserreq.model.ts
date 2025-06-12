import { IHttpErrorPayload } from '@fpx/core';
  
export interface DelegateuserreqMaintanence {
  delegateuserreq?: Delegateuserreq[],
  totalRowCount?:number
  data?: Delegateuserreq[],
  
}
export interface Delegateuserreq  {
	     lastName:any, 
         entityCode:string, 
         address:string, 
         initial:string, 
         mobileNumber:string, 
         customerCode:string, 
         authOn:string, 
         userName:string, 
         createdOn:string, 
         customerName:string, 
         enabled:string, 
         inventoryNumber:string, 
	     firstName:any, 
         emailAddress:string, 
         operationMode:string, 
         authBy:string, 
         modifiedOn:string, 
	     nationality:any, 
         accessLevel:string, 
         createdBy:string, 
         tenantId:string, 
         modifiedBy:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface DelegateuserreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
