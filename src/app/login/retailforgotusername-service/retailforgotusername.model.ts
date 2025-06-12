import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailforgotusernameMaintanence {
  customerverification?: Retailforgotusername[],
  totalRowCount?:number
  data?: Retailforgotusername[],
  
}
export interface Retailforgotusername  {
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
  
  
 export interface RetailforgotusernameResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
