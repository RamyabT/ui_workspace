import { IHttpErrorPayload } from '@fpx/core';

export interface FavpaymentsMaintanence {
  favpayments?: Favpayments[],
  totalRowCount?: number
  data?: Favpayments[],

}
export interface Favpayments {
  inventoryNumber: string,
  debitAccount: string,
  creditAccount: string,
  serviceCode: string,
  paymentId: string,
  customerCode: string,
  paymentCurrency: string,
  beneficiaries: any,
  serviceCodeDesc: string,
  initial?: string;
  beneName?: string;
}


export interface FavpaymentsResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
