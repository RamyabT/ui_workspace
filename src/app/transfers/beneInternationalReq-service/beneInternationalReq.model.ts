import { IHttpErrorPayload } from '@fpx/core';

export interface BeneInternationalReqMaintanence {
  beneInternationalReq?: BeneInternationalReq[],
  totalRowCount?: number
  data?: BeneInternationalReq[],

}
export interface BeneInternationalReq {
  additionalBic: string;
  country: any,
  beneAccount: string,
  beneAccType: any,
  city: string,
  currency: string,
  serviceCode: string,
  termsFlag: string,
  beneId: string,
  customerCode: string,
  authOn: string,
  externalRef: string,
  createdOn: string,
  bankCountry: any,
  inventoryNumber: string,
  operationMode: string,
  modifiedOn: string,
  paymentmode: string,
  bankDescription: string,
  beneficiaryName: string,
  addressLine1: string,
  modifiedBy: string,
  addressLine2: string,
  branchDescription: string,
  isFavourite: string,
  bankCode: string,
  entityCode: string,
  serviceCodeDesc: string,
  nickName: string,
  beneCountry: any,
  accountNumber: string,
  bankAddress: string,
  conAccNumber: string,
  branchCode: string,
  benePhoto: string,
  authBy: string,
  createdBy: string,
  iban: string,
  beneBank: string,
  bic: string,
  remarks: string,
  status: string,
  intermediaryBic: string,
  ifscCode: string
}


export interface BeneInternationalReqResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
