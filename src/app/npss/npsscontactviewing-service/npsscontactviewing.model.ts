import { IHttpErrorPayload } from '@fpx/core';
  
export interface NpsscontactviewingMaintanence {
  npsscontactviewing?: Npsscontactviewing[],
  totalRowCount?:number
  data?: Npsscontactviewing[],
  
}
export interface Npsscontactviewing  {
  displayName:string
  phoneNumbers:PhoneNumber[],
  phoneNumber?:string,
  _index?:any
  }
  export interface PhoneNumber  {
    value:string
    }
  
  
 export interface NpsscontactviewingResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
