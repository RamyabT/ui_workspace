import { IHttpErrorPayload } from '@fpx/core';
 // import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';

export interface BasicDetailsMaintanence {
  BasicDetails?: BasicDetails[],
  totalRowCount?:number
  data?: BasicDetails[],
  
}
export interface BasicDetails  {
	     country:any, 
	     lastName:any, 
         walletType:string, 
         mobileNumber:string, 
	     wallettranlimit:any, 
         customerCode:string, 
         authOn:string, 
         empPosition:string, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
	     //addressinfo:Cobaddressinfo, 
	     empName:any, 
	     currency:any, 
         modifiedBy:string, 
	     empstatus:any, 
         email:string, 
         monthlyIncome:any, 
         walletId:string, 
         walletTypeDesc:string, 
	     firstName:any, 
         authBy:string, 
         createdBy:string, 
	     walletName:any, 
         dob:string, 
         tenantId:string, 
         countryName:string, 
         annualPropertyTax:any,
         otherLoanEMI:any,
         monthlyExpenses:any,
         monthlyCondominiumFees:any,
         additionalEmploymentInfo:any,
         emailAddress:any,
         propCost:any,
         addressLine1:any,
         addressLine2:any,
         zipcode:any,
         city:any,
         state:any,
         empzipcode:any,
         empcity:any,
         empaddressLine2:any,
         empaddressLine1:any,
         empstate:any
  }
  
  
 export interface BasicDetailsResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
