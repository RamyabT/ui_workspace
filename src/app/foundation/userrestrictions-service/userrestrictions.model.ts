import { IHttpErrorPayload } from '@fpx/core';

export interface UserrestrictionsMaintanence {
  userrestrictions?: Userrestrictions[],
  totalRowCount?: number
  data?: Userrestrictions[],

}
export interface Userrestrictions {
  customerCode?: string,
  authOn?: string,
  userId?: string,
  createdOn?: string,
  customerName?: string,
  enabled?: string,
  userdcrestriction?: any,
  userccrestriction?: any,
  authBy?: string,
  modifiedOn?: string,
  createdBy?: string,
  userdeprestriction?: any,
  usercasarestriction?: any,
  userpcrestriction?: any,
  modifiedBy?: string,
  userloanrestriction?: any,
  remarks?: string,
}


export interface UserrestrictionsResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
