import { IHttpErrorPayload } from '@fpx/core';
  import {  Rpcontractbeneficiaryinfo } from '../rpcontractbeneficiaryinfo-service/rpcontractbeneficiaryinfo.model';

export interface RpcontractsuccessorinfoMaintanence {
  rpcontractsuccessorinfo?: Rpcontractsuccessorinfo[],
  totalRowCount?:number
  data?: Rpcontractsuccessorinfo[],
  
}
export interface Rpcontractsuccessorinfo  {
         inventoryNumber:string, 
	     firstName:any, 
	     lastName:any, 
         successorElectConsent:string, 
         initial:string, 
         tenantId:string, 
	     rpcontractbeneficiaryinfo:any, 
	     relationship:any, 
         beneElectConsent:string, 
  }
  
  
 export interface RpcontractsuccessorinfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
