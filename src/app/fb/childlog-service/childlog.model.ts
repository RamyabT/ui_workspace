import { IHttpErrorPayload } from '@fpx/core';
import { Childreqdocdtl } from '../childreqdocdtl-service/childreqdocdtl.model';
import { Childreqaccountdtl } from '../childreqaccountdtl-service/childreqaccountdtl.model';
import { ChildDetails } from '../child-details-service/child-details.model';
import { Paymentsetting } from '../paymentsetting-service/paymentsetting.model';

export interface ChildlogMaintanence {
  childlog?: Childlog[],
  totalRowCount?: number
  data?: Childlog[],

}
export interface Childlog {
  // childreqnotification: any,
  childreqdocdtl: Childreqdocdtl[],
  childDetails: ChildDetails,
  childreqaccountdtl: Childreqaccountdtl,
  paymentsetting: Paymentsetting,
  childreqnotification: Childreqdocdtl[],
  gender: any,
  nickName: string,
  mode: string,
  mobileNumber: any,
  fullName: any,
  authOn: any,
  profileImage: any,
  createdOn: any,
  inventoryNumber: any,
  modifiedOn: any,
  authBy: string,
  createdBy: string,
  dob: any,
  tenantId: any,
  modifiedBy: string,
  relationship: any,
  email: any,
  childOfficialID: any
}


export interface ChildlogResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}	
