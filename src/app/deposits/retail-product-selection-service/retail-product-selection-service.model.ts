import { IHttpErrorPayload } from "@fpx/core";

 export interface RetailProductSelectionMaintanence {
  RetailProductSelection: RetailProductSelection[];
}
export interface RetailProductSelection  {
        processId:string, 
        confrimpassword:string, 
        password:string, 
  }
  
  
 export interface RetailProductSelectionResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	




