import { IHttpErrorPayload } from '@fpx/core';

export interface Membership {
  id: string
  productDesc: string,
  productCode: string,
  accountCurrency: string,
  customerCode: string,
  accountNumber: string,
  availableBalance: string
}