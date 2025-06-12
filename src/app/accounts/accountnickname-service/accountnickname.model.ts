import { IHttpErrorPayload } from '@fpx/core';

export interface AccountnicknameMaintanence {
  accountnickname?: Accountnickname[],
  totalRowCount?: number
  data?: Accountnickname[],

}
export interface Accountnickname {
  entityCode?: string,
  accountName?: string,
  nickName?: string,
  errorMessage?: string,
  errorCode?: string,
  authOn?: string,
  accountNumber?: any,
  userId?: string,
  createdOn?: string,
  clearNickname?: string,
  inventoryNumber?: string,
  authBy?: string,
  modifiedOn?: string,
  createdBy?: string,
  modifiedBy?: string,
  nicknameFlag ?: any,
  action ?: number,
  accountType?: string
}


export interface AccountnicknameResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
