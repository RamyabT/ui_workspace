import { IHttpErrorPayload } from '@fpx/core';
import { Cobaddressinfo } from '../../foundation/cobaddressinfo-service/cobaddressinfo.model';

export interface DdrequestMaintanence {
  ddrequest?: Ddrequest[],
  totalRowCount?: number
  data?: Ddrequest[],

}
export interface Ddrequest {
  baseRate: number,
  country: any,
  errorCode: string,
  authOn: string,
  createdOn: string,
  inventoryNumber?: string,
  modifiedOn: string,
  exchangeRate: Number,
  terms: string,
  beneficiaryName: string,
  currency: any,
  modifiedBy: string,
  issueDate: string,
  authPersonName: string,
  equiAmount: number,
  baseCurrEquiAmount: number,
  beneficiaryID: string,
  addressInfo: Cobaddressinfo,
  amount: any,
  addressType: string,
  chargesAmount: any,
  payableAt: string,
  errorMessage: string,
  updtOn: string,
  accountNumber: any,
  authBy: string,
  createdBy: string,
  authPersonId: string,
  deliveryOption: string,
  entity: string,
  remarks?: string,
  status: string,
  dlvryBranch: any,
  exchangeDetail?: string,
  addressInformation: any;

}


export interface DdrequestResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
