import { IHttpErrorPayload } from '@fpx/core';
  
export interface CustomerinfologMaintanence {
  customerinfolog?: Customerinfolog[],
  totalRowCount?:number
  data?: Customerinfolog[],
  
}
export interface Customerinfolog  {
         proffInventory:string, 
         mobileNumber:string, 
         customerCode:string, 
         authOn:string, 
         userId:string, 
         workAddress?:string, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         authBy:string, 
         createdBy:string, 
	     prooftype:any, 
         residentialAddress:string, 
         modifiedBy:string, 
         email:string, 
  }
  
  
 export interface CustomerinfologResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
