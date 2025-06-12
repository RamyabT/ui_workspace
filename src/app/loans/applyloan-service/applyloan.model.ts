import { IHttpErrorPayload } from '@fpx/core';
  import {  Applicantaddressinfo } from '../../onboarding/applicantaddressinfo-service/applicantaddressinfo.model';
import {  AdditionalEmploymentInfo } from '../additional-employmentInfo/additional-employmentInfo.model';
import {  ExpensesDetails } from '../expensesDetails-service/expensesDetails.model';
import {  CoApplicantsDetails } from '../coApplicantsDetails/co-applicants-details.model';
import {  SupportingDocs } from '../supportingDocs/supporting-docs.model';
import { BasicDetails } from '../basicDetails-service/basicDetails.model';

export interface ApplyloanMaintanence {
  applyloan?: Applyloan[],
  totalRowCount?:number
  data?: Applyloan[],
  
}
export interface Applyloan  {
         emi:string, 
         lastName:string, 
         repaymentAmount:string, 
         serviceCode:string, 
	     workflowDetails:any, 
         mobileNumber:number, 
         authOn:string, 
	     expensesDetails:ExpensesDetails, 
         createdOn:string, 
         coApplicantDetails:CoApplicantsDetails[], 
         emailAddress:any, 
         tenor:number, 
         modifiedOn:string, 
         downPayment:string, 
	     currency:any, 
         modifiedBy:string, 
         applicantId:string, 
	     supportingDocs:SupportingDocs[], 
         interestRate:string, 
	     additionalEmploymentInfo:AdditionalEmploymentInfo[], 
	     employmentInfo:any, 
         interestAmount:string, 
	     applicantaddressinfo:Applicantaddressinfo, 
         loanAmount:string, 
         firstName:string, 
         authBy:string, 
         propertyCost:string, 
         createdBy:string, 
         dob:string, 
         tenantId:string, 
	     productselection:any, 
       basicDetails:BasicDetails,
       documentUpload:any,
       loanDetails:any,
       coApplicant:any,
       primaryAccount:any
  }
  
  
 export interface ApplyloanResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
