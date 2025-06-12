import { IHttpErrorPayload } from '@fpx/core';
import { Wallettranlimit } from '../wallettranlimit-service/wallettranlimit.model';
 // import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';

export interface WalletregistrationMaintanence {
  walletregistration?: Walletregistration[],
  totalRowCount?:number
  data?: Walletregistration[],
  
}
export interface Walletregistration  {
	     country:any, 
	     lastName:any, 
         walletType:string, 
         mobileNumber:string, 
	     wallettranlimit:Wallettranlimit, 
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
         monthlyIncome:number, 
         walletId:string, 
         walletTypeDesc:string, 
	     firstName:any, 
         authBy:string, 
         createdBy:string, 
	     walletName:any, 
         dob:string, 
         tenantId:string, 
         countryName:string, 
         walletregistration:Walletregistration
  }
  
  
 export interface WalletregistrationResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
