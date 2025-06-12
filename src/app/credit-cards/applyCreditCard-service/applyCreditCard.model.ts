import { IHttpErrorPayload } from '@fpx/core';
// import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';

export interface ApplyCreditCardMaintanence {
  applyCreditCard?: ApplyCreditCard[],
  totalRowCount?: number
  data?: ApplyCreditCard[],

}
export interface ApplyCreditCard {
  autoCompleteFlag: string,
  termsFlag: string,
  requestReference: string,
  customerCode: string,
  accountNumber: any,
  branches: any,
  inventoryNumber?: string,
  charges: any,
  authPersonId: string,
  deliveryOption: string,
  authPersonName: string,
  remarks?: string,
  creditcardtype: any,
  currency: any,
  income: any,
  sourceOfIncome: string,
  supplementaryCard: string,
  creditCardLimit: any,
  monthlyLiabilityRepayment:any,
  lengthlengthOfService:number,
  addressInformation: any
}


export interface ApplyCreditCardResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
