import { IHttpErrorPayload } from '@fpx/core';
  
export interface RetailetransferhistoryfilterMaintanence {
  retailetransferhistoryfilter?: Retailetransferhistoryfilter[],
  totalRowCount?:number
  data?: Retailetransferhistoryfilter[],
  
}
export interface Retailetransferhistoryfilter  {
  }
  
  
 export interface RetailetransferhistoryfilterResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
