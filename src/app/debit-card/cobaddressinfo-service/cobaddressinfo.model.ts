import { IHttpErrorPayload } from '@fpx/core';

export interface CobaddressinfoMaintanence {
  cobaddressinfo?: Cobaddressinfo[],
  totalRowCount?: number
  data?: Cobaddressinfo[],

}
export interface Cobaddressinfo {
  inventoryNumber: string,
  buildingName: string,
  country: any,
  zipCode: string,
  city: string,
  addressType: string,
  mobileNumber: string,
  street: string,
  state: any,
  email: string,
  buildingId: string,
}


export interface CobaddressinfoResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
