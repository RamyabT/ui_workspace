import { IHttpErrorPayload } from '@fpx/core';
  // import {  Addressdetail } from '../../foundation/addressdetail-service/addressdetail.model';
import { Addressdetail } from '../addressdetail-service/addressdetail.model';
import { AddCountryOfTax } from 'src/app/foundation/addCountry-of-tax-inputgrid/addCountry-of-tax-inputgrid.model';

export interface AdditionalInformationMaintanence {
  additionalInformation?: AdditionalInformation[],
  totalRowCount?:number
  data?: AdditionalInformation[],
  
}
export interface AdditionalInformation  {
         localForeignInward:string, 
	     occupation:any, 
         annualIncome:string, 
	     typeOfEntity:any, 
         estimatedTotalNetWorth:string, 
         authOn:string, 
         localForeignOutward:string, 
         salary:string, 
         createdOn:string, 
         yearOfBusiness:number, 
         modifiedOn:string, 
	     sourceOfWealth:any, 
         grossCreditTurnover:string, 
         avgCashWithdraw:string, 
         UDF5:string, 
         dualNationalityHolderFlag:string, 
         UDF4:string, 
         modifiedBy:string, 
         UDF3:string, 
         applicantId:string, 
	     countryOfTaxResidence:AddCountryOfTax, 
         UDF2:string, 
         UDF1:string, 
         outwardClearing:string, 
	     address:Addressdetail, 
         otherIncome:string, 
         authBy:string, 
         createdBy:string, 
	     mainSourceOfIncome:any, 
	     dualNationalityHolder:any, 
         cashDeposit:string, 
         tenantId:string, 
         name:string, 
         yearsInEmployment:number, 
         grossDebitTurnover:string, 
         percentageOfOwnership:number, 
         InwardClearing:string, 
         USQueriesFlag:string, 
  }
  
  
 export interface AdditionalInformationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
