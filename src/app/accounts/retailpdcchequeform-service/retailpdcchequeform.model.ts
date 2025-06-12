import { IHttpErrorPayload } from '@fpx/core';
  // import {  Pdcchequereq } from '../../accounts/retail-pdc-cheque-display-grid/retail-pdc-cheque-display-grid.model';

export interface RetailpdcchequeformMaintanence {
  retailpdcchequeform?: Retailpdcchequeform[],
  totalRowCount?:number
  data?: Retailpdcchequeform[],
  
}
export interface Retailpdcchequeform  {
  }
  
  
 export interface RetailpdcchequeformResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
