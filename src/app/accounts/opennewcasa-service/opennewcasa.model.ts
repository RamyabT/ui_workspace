import { IHttpErrorPayload } from '@fpx/core';
  
export interface OpennewcasaMaintanence {
  opennewcasa?: Opennewcasa[],
  totalRowCount?:number
  data?: Opennewcasa[],
  
}
export interface Opennewcasa  {
	     openingBranch:any, 
         accountName:string, 
         mobileNumber?:string, 
         termsFlag:string, 
         requestReference:string, 
	     accountCurrency:any, 
	     addressDetails:any, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         modifiedOn:string, 
         exchangeRate:number, 
         modifiedBy:string, 
	     depositCurrency:any, 
         authPersonName:string, 
         equiAmount:number, 
         email?:string, 
         entityCode:string, 
	     debitAccountNumber:any, 
	     accountType:any, 
         chargesAmount:any, 
         debitAmount:number, 
         initialDepositAmount:any, 
         authBy:string, 
         baseRate:number, 
	     productCode:any, 
         createdBy:string, 
         authPersonId:string, 
         deliveryOption:string, 
         remarks:string, 
         ischequebookreq:string, 
         debitCurrency:any
         addressInformation:any
  }
  
  
 export interface OpennewcasaResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
