import { IHttpErrorPayload } from '@fpx/core';
  import {  Rpaddressinfo } from '../rpaddressinfo-service/rpaddressinfo.model';
import {  Rpcontractaccountinfo } from '../rpcontractaccountinfo-service/rpcontractaccountinfo.model';
import {  Rpcontractsuccessorinfo } from '../rpcontractsuccessorinfo-service/rpcontractsuccessorinfo.model';

export interface RpcontractinfoMaintanence {
  rpcontractinfo?: Rpcontractinfo[],
  totalRowCount?:number
  data?: Rpcontractinfo[],
  
}
export interface Rpcontractinfo  {
         lastName:string, 
         sinUsageConsent:string, 
         rpContractStatus:string, 
         mobileNumber:string, 
         contractType:string, 
         customerCode:string, 
         authOn:string, 
         inventoryNumber:string, 
         emailAddress:string, 
         modifiedOn:string, 
         rpContractNumber:string, 
         sin:string, 
         rpContactMethod:string, 
	     currency:any, 
         modifiedBy:string, 
         CreatedOn:string, 
	     rpaddress:any, 
         firstName:string, 
         rpContractAckReference:string, 
         authBy:string, 
         createdBy:string, 
         dob:string, 
	     rpsuccessor:any, 
         usResident:number, 
         tenantId:string, 
	     addCountryOfTax:any, 
         trustAgreedFlag:string, 
	     rpaccount:any, 
  }
  
  
 export interface RpcontractinfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
