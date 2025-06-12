import { IHttpErrorPayload } from '@fpx/core';
  
export interface EtransferautodepositMaintanence {
  etransferautodeposit?: Etransferautodeposit[],
  totalRowCount?:number
  data?: Etransferautodeposit[],
  
}
export interface Etransferautodeposit  {
         serviceType:string, 
	     depositAccountName:any, 
         entityCode:string, 
         serviceCode:string, 
         termsFlag:string, 
         customerCode:string, 
         emailID:string, 
         authOn:string, 
         createdOn:string, 
         registrationExpiryDate:string, 
         modifiedOn:string, 
         authBy:string, 
         rejectedBy:string, 
         createdBy:string, 
	     depositAccount:any, 
         tenantId:string, 
         registrationDate:string, 
         accountAliasReference:string, 
         modifiedBy:string, 
         rejectedOn:string, 
  }
  
  
 export interface EtransferautodepositResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
