import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailunlockuserMaintanence {
  customerverification?: Retailunlockuser[],
  totalRowCount?:number
  data?: Retailunlockuser[],
  
}
export interface Retailunlockuser  {
         inventoryNumber:string, 
         serviceCode:string, 
         dob:string, 
         customerId:string, 
         identificationNumber:string, 
         accountNumber:string, 
         userId:string, 
         updOn:string, 
         identificationMode:string, 
  }
  
  
 export interface RetailunlockuserResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
