import { IHttpErrorPayload } from '@fpx/core';

export interface EtransferMaintanence {
  etransfer?: Etransfer[],
  totalRowCount?: number
  data?: Etransfer[],

}
export interface Etransfer {
  directDepositReferenceNumber?: any;
  fulfillConsent?: any
  contactCategory: string,
  debitCurrency: any,
  endDate: string,
  beneId: string,
  rateApplied: string,
  notificationPreference: string,
  errorCode: string,
  authOn: string,
  paymentFrequency?: string,
  paymentId: string,
  beneficiaryName: string,
  transferMode: string,
  createContact?: string,
  beneficiaryAdvice: string,
  isFavourite: string,
  scheduleId: string,
  contactId: any,
  contactName: any,
  debitAmount: number,
  authBy: string,
  scheduleType: string,
  baseRateApplied: string,
  contactPhoneNumber?: string,
  transactionVersion: string,
  paymentCurrency: any,
  creditAmount: number,
  errorDescription: string,
  securityAnswer: string,
  serviceCode: string,
  termsFlag: string,
  customerCode: string,
  paymentAmount: number,
  createdOn: string,
  modifiedOn: string,
  modifiedBy: string,
  paymentStatus: string,
  numberOfPayments: number,
  contactEmailId?: string,
  entityCode: string,
  sourceAccount: any,
  securityQuestion: string,
  paymentMode: string,
  chargesAmount: number,
  creditAccountNumber: string,
  chargesBorneBy: any,
  baseCurrencyAmount: number,
  beneficiaryEmail: string,
  createdBy: string,
  tenantId: string,
  paymentDaysInterval: number,
  creditCurrency: any,
  allPurpose: any,
  paymentDate: string,
  remarks: string,
  confirmSecurityAnswer: any,
  isPreferred?: any,
  paymentReqId?: any,
  depositConsent?: any,
  autoDepositEnabled?: any,
  remarks1?: any,
  remarks2?:any,
  operationMode?: any;
}


export interface EtransferResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
