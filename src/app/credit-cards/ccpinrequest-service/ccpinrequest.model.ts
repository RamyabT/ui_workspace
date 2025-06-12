import { IHttpErrorPayload } from '@fpx/core';
  
export interface CcpinrequestMaintanence {
  ccpinrequest?: Ccpinrequest[],
  totalRowCount?:number
  data?: Ccpinrequest[],
  
}
export interface Ccpinrequest  {
         confirmPin:any, 
         autoCompleteFlag:string, 
         requestReference:string, 
         errorMessage:string, 
         errorCode:string, 
         customerCode:string, 
         updtOn:string, 
         authOn:string, 
         createdOn:string, 
         inventoryNumber:string, 
         authBy:string, 
         modifiedOn:string, 
	     cardRefNumber:any, 
         pin:any, 
         createdBy:string, 
         terms:string, 
         modifiedBy:string, 
         reEnterNewPin:any, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface CcpinrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
