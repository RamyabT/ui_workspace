import { IHttpErrorPayload } from '@fpx/core';
  
export interface PdcchequereqMaintanence {
  pdcchequereq?: Pdcchequereq[],
  totalRowCount?:number
  data?: Pdcchequereq[],
  
}
export interface Pdcchequereq  {
         branchCode:string, 
         bankCode:string, 
         amount:number, 
         bank:string, 
	     accountNumber:any, 
         chequeNumber:number, 
         chequePostedDate:string, 
         branch:string, 
         status:string, 
  }
  
  
 export interface PdcchequereqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
