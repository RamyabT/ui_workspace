import { IHttpErrorPayload } from '@fpx/core';

export interface ChangeproductreqMaintanence {
  changeproductreq?: Changeproductreq[],
  totalRowCount?: number
  data?: Changeproductreq[],
  

}
export interface Changeproductreq {
  inventoryNumber: string,
  modifiedOn: string,
  authBy: string,
  entityCode: string,
  createdBy: string,
  termsFlag: string,
  newProductCode: any,
  requestDate: string,
  modifiedBy: string,
  authOn: string,
  accountNumber: String,
  createdOn: string,
  
  
}


export interface ChangeproductreqResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
