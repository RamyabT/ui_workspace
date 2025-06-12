import { IHttpErrorPayload } from '@fpx/core';

export interface CcRewardBenefitsMaintanence {
  ccRewardBenefits?: CcRewardBenefits[],
  totalRowCount?: number
  data?: CcRewardBenefits[],

}

export interface CcRewardBenefits {
  prodctLink: string,
  imgId: string,
  description: string,
  authOn: string,
  createdOn: string,
  ccRewardsInfo: CcRewardsInfo[],
  prodCode: string,
  authBy: string,
  modifiedOn: string,
  createdBy: string,
  tenantId: string,
  modifiedBy: string,
  enabledflag: string,
  creditcardtype: any,
  ccBenefitsInfo: CcBenefitsInfo[],
}

export interface CcRewardBenefitsResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}

export interface CcRewardsInfoMaintanence {
  ccRewardsInfo?: CcRewardsInfo[],
  totalRowCount?: number
  data?: CcRewardsInfo[],
}

export interface CcRewardsInfo {
  prodCode: string,
  rewardId: string,
  detailNo: string,
  tenantId: string,
  rewardDescription: string,
}

export interface CcRewardsInfoResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}

export interface CcBenefitsInfoMaintanence {
  ccBenefitsInfo?: CcBenefitsInfo[],
  totalRowCount?: number
  data?: CcBenefitsInfo[],

}

export interface CcBenefitsInfo {
  benefitDescription: string,
  prodCode: string,
  dtlSl: string,
  tenantId: string,
  benefitId: string,
}

export interface CcBenefitsInfoResponse {
  inventoryNo?: string;
  httpStatus?: number;
  error?: IHttpErrorPayload;
}


