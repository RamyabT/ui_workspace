import { IHttpErrorPayload } from '@fpx/core';
  
export interface NfcMaintanence {
  nfc?: Nfc[],
  totalRowCount?:number
  data?: Nfc[],
  
}
export interface Nfc  {
         applicantId:string, 
  }
  
  
 export interface NfcResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
