import { IHttpErrorPayload } from '@fpx/core';

export interface BeneficiariesMaintanence {
  beneficiaries?: Beneficiaries[],
  totalRowCount?:number
  data?: Beneficiaries[],
  
}
export interface Beneficiaries  {
         delegateId: any;
         operationMode: any;
         userId: any;
         createdBy: any;
         country:string, 
         bankCode:string, 
         beneAccount:string, 
         entityCode:string, 
         beneNickName:string, 
         serviceCodeDesc:string, 
         serviceCode:string, 
         city:string, 
         customerCode:string, 
         externalRef:string, 
         benePhoto:string, 
         branchCode:string, 
         inventoryNumber:string, 
         bankDescription:string, 
         terms:string, 
         beneficiaryName:string, 
         addressLine1:string, 
         addressLine2:string, 
         branchDescription:string, 
         isFavourite:string, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface BeneficiariesResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
