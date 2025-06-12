import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailselfregisterMaintanence {
  retailselfregister?: Retailselfregister[],
  totalRowCount?:number
  data?: Retailselfregister[],
  
}
export interface Retailselfregister  {
      inventoryNumber ?:any,
      identificationMode:any,
      identificationNumber:any,
      customerId?:string,
      accountNumber?:string,
      dob:string

  }
  
  
 export interface RetailselfregisterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
