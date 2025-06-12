import { IHttpErrorPayload } from '@fpx/core';
  
export interface PfmtransactionMaintanence {
  pfmtransaction?: Pfmtransaction[],
  totalRowCount?:number
  data?: Pfmtransaction[],
  
}
export interface Pfmtransaction  {
         integrationMethod:string, 
         transactionCurrency:string, 
	     merchantCode:any, 
         sourceSystem:string, 
         customerCode:string, 
         transactionDescription:string, 
         authOn:string, 
	     categoryCode:any, 
         accountNumber:string, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
	     transactioncategory:any, 
         createdBy:string, 
         transactionAmount:number, 
         tenantId:string, 
         externalReferenceNumber:string, 
         modifiedBy:string, 
         paymentDate:string, 
         transactionRef:string
        }
  
  
 export interface PfmtransactionResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
