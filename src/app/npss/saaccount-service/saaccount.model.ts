import { IHttpErrorPayload } from '@fpx/core';
  
export interface SaaccountMaintanence {
  saaccount?: Saaccount[],
  totalRowCount?:number
  data?: Saaccount[],
  
}
export interface Saaccount  {
         ledgerAmount:number, 
         accountName:string, 
         creditNetInterestAccrued:number, 
         mobileNumber:string, 
         closingBalance:number, 
         accountCurrency:string, 
         statementFrequency:string, 
         customerCode:string, 
         holdBalance:number, 
         branchDesc:string, 
         accountTypeDesc:string, 
         availableBalance:number, 
         unclearedBalance:number, 
         accountStatus:string, 
         creditInterestFrequency:string, 
         BICCode:string, 
         actualBalance:number, 
         openingBalance:number, 
         email:string, 
	     addressInfo:any, 
         address:string, 
         nickName:string, 
         accountType:string, 
         currentBalance:number, 
         accountNickName:string, 
         accountNumber:string, 
         lienAmount:number, 
         productDesc:string, 
         branchCode:string, 
         closeDate:string, 
         floatBalance:number, 
         nomineeDetails:string, 
         productCode:string, 
         mailingAddress:string, 
         iban:string, 
         taxRegistrationNumber:string, 
         countryName:string, 
         openDate:string, 
         creditInterestRate:number, 
         routingCode:string, 
  }
  
  
 export interface SaaccountResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
