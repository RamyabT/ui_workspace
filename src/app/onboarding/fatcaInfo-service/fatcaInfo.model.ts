import { IHttpErrorPayload } from '@fpx/core';
import { Othercountrytaxinfo } from 'src/app/onboarding/othercountry-taxinfo-inputgrid/othercountry-taxinfo-inputgrid.model';
  // import {  Othercountrytaxinfo } from '../../foundation/othercountry-taxinfo-inputgrid/othercountry-taxinfo-inputgrid.model';

export interface FatcaInfoMaintanence {
  fatcaInfo?: FatcaInfo[],
  totalRowCount?:number
  data?: FatcaInfo[],
  
}
export interface FatcaInfo  {
         authOn:string, 
         taxPayerIdAvailable:string, 
         createdOn:string, 
	     othercountrytaxinfo?:Othercountrytaxinfo[], 
         cityOfBirth:string, 
         authBy:string, 
         modifiedOn:string, 
	     countryOfBirth:any, 
         createdBy:string, 
         usResident:string, 
         taxPayerId:string, 
	     countryOfTax:any, 
         modifiedBy:string, 
         applicantId:string, 
  }
  
  
 export interface FatcaInfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
