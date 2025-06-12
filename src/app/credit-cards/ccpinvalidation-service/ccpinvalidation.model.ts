import { IHttpErrorPayload } from '@fpx/core';
  
export interface DcpinrequestMaintanence {
  dcpinrequest?: Dcpinrequest[],
  totalRowCount?:number
  data?: Dcpinrequest[],
  
}
export interface Dcpinrequest  {
         confirmPin:number, 
         cbxrTerms:string, 
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
         pin:number, 
         createdBy:string, 
         previousPin:number, 
         modifiedBy:string, 
         reEnterNewPin:number, 
         remarks:string, 
         status:string, 
  }
  
  
 export interface DcpinrequestResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	
