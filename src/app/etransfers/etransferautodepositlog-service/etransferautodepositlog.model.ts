import { IHttpErrorPayload } from '@fpx/core';
  
export interface EtransferautodepositlogMaintanence {
  etransferautodepositlog?: Etransferautodepositlog[],
  totalRowCount?:number
  data?: Etransferautodepositlog[],
  
}
export interface Etransferautodepositlog  {
         serviceType:string, 
         depositAccountName:string, 
         entityCode:string, 
         errorDesc:string, 
         serviceCode:string, 
         termsFlag:string, 
         customerCode:string, 
         errorCode:string, 
         emailID:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         operationMode:string, 
         modifiedOn:string, 
         authBy:string, 
         rejectedBy:string, 
         createdBy:string, 
	     depositAccount:any, 
         tenantId:string, 
         registrationDate:string, 
         modifiedBy:string, 
         rejectedOn:string, 
         ntfnType:string,
         requestReferenceNumber:string,
         mobileNumber:any
  }
  
  
 export interface EtransferautodepositlogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
