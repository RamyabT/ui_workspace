import { IHttpErrorPayload } from '@fpx/core';
  
export interface EtransfercontactlogMaintanence {
  etransfercontact?: Etransfercontactlog[],
  totalRowCount?:number
  data?: Etransfercontactlog[],
  
}
export interface Etransfercontactlog  {
	       country:any, 
         beneAccount:string, 
         securityAnswer?:string, 
         serviceCode:string, 
         city:string, 
         termsFlag:string, 
         beneId?:string, 
         notificationPreference?:string, 
         customerCode:string, 
         emailId?:string, 
         authOn:string, 
         externalRef:string, 
         createdOn:string, 
         inventoryNumber:string, 
         customerType:string, 
         operationMode?:string, 
         modifiedOn:string, 
         paymentmode:string, 
         beneficiaryName:string, 
         addressLine1:string, 
         modifiedBy:string, 
         addressLine2:string, 
         isFavourite:string, 
         entityCode:string, 
         beneFullName:string, 
         serviceCodeDesc:string, 
         securityQuestion?:string, 
         contactId:string, 
         nickName:string, 
         benePhoto:string, 
         firstName?:string, 
         authBy:string, 
         phoneNumber?:string, 
         createdBy:string, 
         tenantId:string, 
         beneBank:string, 
         remarks:string, 
         status:string, 
         mode?: string,
         preferredLanguage?: any
  }
  
  
 export interface EtransfercontactlogResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
