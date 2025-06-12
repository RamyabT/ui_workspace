import { IHttpErrorPayload } from '@fpx/core';

export interface BeneInternationalMaintanence {
  beneInternational?: BeneInternational[],
  totalRowCount?: number
  data?: BeneInternational[],

}
export interface BeneInternational {
  additionalBic: any;
  id: any,
  country: any,
  beneAccount: string,
  beneAccType: any,
  city: string,
  currency:string, 
  serviceCode: string,
  termsFlag: string,
  customerCode: string,
  authOn: string,
  externalRef: string,
  createdOn: string,
  inventoryNumber: string,
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
  nickName: string,
  bankCountry: any,
  beneCountry: any,
  accountNumber: string,
  bankAddress: string,
  conAccNumber: string,
  branchCode: string,
  benePhoto: string,
  authBy: string,
  rejectedBy: string,
  createdBy: string,
  iban: string,
  rejectedOn: string,
  bic: string,
  remarks: string,
  status: string,
  intermediaryBic:string,
  ifscCode:string
}


export interface BeneInternationalResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
