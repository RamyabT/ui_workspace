import { IHttpErrorPayload } from '@fpx/core';

export interface TempScheduleRepMaintanence {
  tempScheduleRep?: TempScheduleRep[],
  totalRowCount?: number
  data?: TempScheduleRep[],

}
export interface TempScheduleRep {
  numberOfPayments: number,
  nextPaymentDate: string,
  sourceAccount: any,
  serviceCode: string,
  beneId: string,
  creditAccountNumber: string,
  paymentAmount: number,
  scheduleType: string,
  paymentId: string,
  beneficiaryName: string,
  paymentCurrency: any,
  paymentDate: string,
  paymentFrequency: any,
  paymentStatus: string,
  serviceCodeDescription: string,
  transactionReference?: string,
  serviceTypeDescription:string

}


export interface TempScheduleRepResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
