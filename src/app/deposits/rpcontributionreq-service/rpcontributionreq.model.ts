import { IHttpErrorPayload } from '@fpx/core';
  
export interface RpcontributionreqMaintanence {
  rpcontributionreq?: Rpcontributionreq[],
  totalRowCount?:number
  data?: Rpcontributionreq[],
  
}
export interface Rpcontributionreq  {
         amount:number, 
         baseEquiAmount:number, 
         debitAccount:string, 
	     creditAccount:any, 
	     debitCurrency:any, 
         customerCode:string, 
         authOn:string, 
         debitAmount:number, 
         createdOn:string, 
         inventoryNumber:string, 
         charges:number, 
         authBy:string, 
         modifiedOn:string, 
         baseRate:number, 
         exchangeRate:number, 
         createdBy:string, 
         tenantId:string, 
	     currency:any, 
         modifiedBy:string, 
	     creditCurrency:any, 
         creditAmount:number, 
         remarks:string, 
  }
  
  
 export interface RpcontributionreqResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
