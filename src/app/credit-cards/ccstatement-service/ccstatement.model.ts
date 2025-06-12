import { IHttpErrorPayload } from '@fpx/core';
import { Ccstatementdetail } from '../ccstatementdetail-service/ccstatementdetail.model';
  // import {  Ccstatementdetail } from '../retail-ccstatementdetail-ro-grid/retail-ccstatementdetail-ro-grid.model';

export interface CcstatementMaintanence {
  ccstatement?: Ccstatement[],
  totalRowCount?:number
  data?: Ccstatement[],
  
}
export interface Ccstatement  {
         fromDate:string, 
	     cardRefNumber:any, 
         toDate:string, 
         transactionsRange:string, 
	     ccstatementdetail:Ccstatementdetail[], 
  }
  
  
 export interface CcstatementResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
