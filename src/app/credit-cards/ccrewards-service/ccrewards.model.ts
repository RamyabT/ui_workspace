import { IHttpErrorPayload } from '@fpx/core';
  import {  CcRewardBenefits } from '../ccRewardBenefits-service/ccRewardBenefits.model';

export interface CcrewardsMaintanence {
  ccrewards?: Ccrewards[],
  totalRowCount?:number
  data?: Ccrewards[],
  
}
export interface Ccrewards  {
	     ccRewardBenefits:CcRewardBenefits, 
  }
  
  
 export interface CcrewardsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
