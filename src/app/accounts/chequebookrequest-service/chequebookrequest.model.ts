import { IHttpErrorPayload } from '@fpx/core';
import { Cobaddressinfo } from '../../foundation/cobaddressinfo-service/cobaddressinfo.model';
import { Chequebookleaves } from '../chequebookleaves-service/chequebookleaves.model';
import { Chequebooks } from '../chequebooks-service/chequebooks.model';

export interface ChequebookrequestMaintanence {
  chequebookrequest?: Chequebookrequest[],
  totalRowCount?: number
  data?: Chequebookrequest[],

}
export interface Chequebookrequest {
  lastName: string,
  termsFlag: string,
  errorCode: string,
  addressDetails: Cobaddressinfo[],
  authOn: string,
  fileUpload: any,
  createdOn: string,
  inventoryNumber: string,
  cardFourDigits: number,
  modifiedOn: string,
  noOfLeaves: Chequebookleaves,
  isCardUpdateRequired: string,
  noOfChequeBooks: Chequebooks,
  isPhoneNumberRequired: string,
  requestDate: string,
  currency: any,
  modifiedBy: string,
  authPersonName: string,
  entityCode: string,
  addressInformation: string,
  addressType: string,
  errorMessage: string,
  chargesAmount: number,
  updtOn: string,
  accountNumber: any,
  deliveryBranch: any,
  firstName: string,
  authBy: string,
  phoneNumber: number,
  chequeBookType: string,
  createdBy: string,
  authPersonId: string,
  deliveryOption: string,
  chequeStartNumber: number,
  remarks: string,
  status: string,
}


export interface ChequebookrequestResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
