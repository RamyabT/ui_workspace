import { IHttpErrorPayload } from '@fpx/core';
  
export interface DelegateuserMaintanence {
  delegateuser?: Delegateuser[],
  totalRowCount?:number
  data?: Delegateuser[],
  
}
export interface Delegateuser  {
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
	     enabled:any, 
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
	     status:any, 
  }
  
  
 export interface DelegateuserResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
