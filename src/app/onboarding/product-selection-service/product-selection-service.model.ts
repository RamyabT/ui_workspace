import { IHttpErrorPayload } from "@fpx/core";

 export interface ProductSelectionMaintanence {
  ProductSelection: ProductSelection[];
}
export interface ProductSelection  {
        processId:string, 
        confrimpassword:string, 
        password:string, 
  }
  
  
 export interface ProductSelectionResponse {
    inventoryNo? : string ;
    httpStatus? : number;
    error? : IHttpErrorPayload;
}	




