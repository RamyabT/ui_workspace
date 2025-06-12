import { IHttpErrorPayload } from '@fpx/core';
  
export interface CustomerdocumentdtlsMaintanence {
  customerdocumentdtls?: Customerdocumentdtls[],
  totalRowCount?:number
  data?: Customerdocumentdtls[],
  
}
export interface Customerdocumentdtls  {
         expiryDate:string, 
         inventoryNumber:string, 
         fileName:string, 
         docInvNumber:string, 
         uploadType:string, 
         customerCode:string, 
         id:string, 
         idNumber:string, 
  }
  
  
 export interface CustomerdocumentdtlsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
