import { IHttpErrorPayload } from '@fpx/core';
import { AddCountryOfTax } from 'src/app/foundation/addCountry-of-tax-inputgrid/addCountry-of-tax-inputgrid.model';

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
	     firstName:any, 
         rpContractAckReference:string, 
         authBy:string, 
         createdBy:string, 
         dob:string, 
	     rpsuccessor:any, 
         usResident:number, 
         tenantId:string, 
	     addCountryOfTax:AddCountryOfTax[], 
         trustAgreedFlag:string, 
	     rpaccount:Rpcontractinfo, 
  }
  
  
 export interface RpcontractinfoResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
